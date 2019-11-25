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


@WebServlet("/GetAllDrivers")

public class GetAllDrivers extends HttpServlet {
    private static final long serialVersionUID = 5L;
    private static final Gson gson = new Gson();
    private static Connection connection = null;
    class Driver{
        String driverName;
        String driverEmail;
        String driverPhone;
        String rating;
        String car;
        String license;
        String carImage;
        public Driver(String name, String email, String phone, String rating, String car, String license, String image){
            this.driverName = name;
            this.driverEmail = email;
            this.driverPhone = phone;
            this.rating = rating;
            this.car = car;
            this.license = license;
            this.carImage = image;
        }
    }
    List<Driver> driversList = new ArrayList<Driver>();
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
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setHeader("Access-Control-Allow-Origin", "*");
        PrintWriter printWriter = response.getWriter();
        Utility util = new Utility(request, printWriter);
        System.out.print("Book A Cab GET Request: ");
        JsonObject jsonObject =  Utility.getRequestJSON(request, gson);
        System.out.print(jsonObject);
        try {
            connectDatabase();
            Statement stmt = connection.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM drivers;");

            while(rs.next()){
                Driver driver = new Driver(rs.getString("username"),rs.getString("email"),rs.getString("phone"),rs.getString("rating"),rs.getString("car"),rs.getString("license"),rs.getString("car_image"));
                driversList.add(driver);
            }
            System.out.print(gson.toJson(driversList));
            printWriter.println(gson.toJson(driversList));
            driversList.clear();
        } catch (SQLException e) {
            e.printStackTrace();
            response.setStatus(500);
            printWriter.println(gson.toJson("error"));
        }
    }
}