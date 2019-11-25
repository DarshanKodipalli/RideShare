
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
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

@WebServlet("/BookCab")

public class BookCab extends HttpServlet {
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
        connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/RideShareDB?autoReconnect=true&useSSL=false", "root", "edenUbuntu");
    }

    class Response {
        boolean error;
        String message;

        public Response() {
            this.error = true;
            this.message = "Operation was not Successful";
        }

        public Response(boolean error, String message) {
            this.error = error;
            this.message = message;
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setHeader("Access-Control-Allow-Origin", "*");
        PrintWriter printWriter = response.getWriter();
        Utility util = new Utility(request, printWriter);
        System.out.print("Book A Cab Post Request: ");
        JsonObject jsonObject =  Utility.getRequestJSON(request, gson);
        System.out.print(jsonObject);
        String username = jsonObject.get("username").getAsString();
        String driver = jsonObject.get("driver").getAsString();
        String rideType = jsonObject.get("rideType").getAsString();
        String source = jsonObject.get("source").getAsString();
        String destination = jsonObject.get("destination").getAsString();
        String distance = jsonObject.get("distance").getAsString();
        String dropzipcode = jsonObject.get("dropzipcode").getAsString();
        String pickUpzipcode = jsonObject.get("pickUpzipcode").getAsString();
        String ridePrice = jsonObject.get("price").getAsString();
        DatabaseAPI dbAPI = new DatabaseAPI();

        DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd");
        Date date = new Date();
        System.out.println(dateFormat.format(date)); //2016/11/16 12:08:43

        DateFormat dateFormat1 = new SimpleDateFormat("HH:mm:ss");
        Date date1 = new Date();
        System.out.println(dateFormat1.format(date1)); //2016/11/16 12:08:43

        try {
            connectDatabase();
            PreparedStatement pst = connection.prepareStatement("insert into rides(customer, driver, ride_type, source, destination, distance, price, dropzipcode, pickupzipcode, status, booked_on_date, booked_on_time, duration) values(?,?,?,?,?,?,?,?,?,?,?,?,?);");
            pst.setString(1, username);
            pst.setString(2, driver);
            pst.setString(3, rideType);
            pst.setString(4, source);
            pst.setString(5, destination);
            pst.setDouble(6, Double.parseDouble(distance));
            pst.setDouble(7, Double.parseDouble(ridePrice));
            pst.setInt(8, Integer.parseInt(dropzipcode));
            pst.setInt(9, Integer.parseInt(pickUpzipcode));
            pst.setString(10, "Booked");
            pst.setString(11, dateFormat.format(date));
            pst.setString(12, dateFormat1.format(date1));
            pst.setDouble(13, Double.parseDouble(jsonObject.get("duration").getAsString()));

            System.out.print(pst);
            pst.execute();
            Response resp = new Response(
                    false,
                    "Ride Saved Successfully"
            );
            printWriter.println(gson.toJson(resp));
        } catch (SQLException e) {
            e.printStackTrace();
            response.setStatus(500);
            printWriter.println(gson.toJson(new Response()));
        } 
    }
}