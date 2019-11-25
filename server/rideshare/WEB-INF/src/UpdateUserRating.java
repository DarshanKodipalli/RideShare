import java.io.PrintWriter;
import java.sql.SQLException;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.UUID;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.PreparedStatement;
import java.sql.DriverManager;
import java.sql.Statement;
import java.util.HashMap;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;


@WebServlet("/UpdateUserRating")

public class UpdateUserRating extends HttpServlet {
    private static final long serialVersionUID = 5L;
    private static final Gson gson = new Gson();
    private static Connection connection = null;

    private void connectDatabase() throws SQLException {
        try {
            Class.forName("com.mysql.jdbc.Driver");
        } catch (Exception e) {
            e.printStackTrace();
            throw new SQLException("Unable to instantiate JDBC Driver");
        }
        connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/RideShareDB?autoReconnect=true&useSSL=false", "rideshareAdmin", "rd@123");
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setHeader("Access-Control-Allow-Origin", "*");
        PrintWriter printWriter = response.getWriter();
        Utility util = new Utility(request, printWriter);
        System.out.print("Update User Rating: ");
        JsonObject jsonObject =  Utility.getRequestJSON(request, gson);
        System.out.print(jsonObject);
        DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd");
        Date date = new Date();

        DateFormat dateFormat1 = new SimpleDateFormat("HH:mm:ss");
        Date date1 = new Date();

        String username = jsonObject.get("customer").getAsString();
        String rideSource = jsonObject.get("source").getAsString();
        String rideDestination = jsonObject.get("destination").getAsString();
        String userRating = jsonObject.get("rating").getAsString();
        String userRole = jsonObject.get("role").getAsString();
        try {
            connectDatabase();
            PreparedStatement pst;
            if(userRole.equals("driver")){
                pst = connection.prepareStatement("update rides set driverRating=? where (customer=? and source=? and destination=?);");
            }else{
                pst = connection.prepareStatement("update rides set userRating=? where (customer=? and source=? and destination=?);");
            }
            pst.setString(1, userRating);
            pst.setString(2, username);
            pst.setString(3, rideSource);
            pst.setString(4, rideDestination);
            System.out.println(pst);
            pst.executeUpdate();
            printWriter.println(gson.toJson("Rating Saved"));
        } catch (SQLException e) {
            e.printStackTrace();
            response.setStatus(500);
            printWriter.println(gson.toJson("error"));
        }
    }
}