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


@WebServlet("/SearchRecord")

public class SearchRecord extends HttpServlet {
    private static final long serialVersionUID = 5L;
    private static final Gson gson = new Gson();
    private static Connection connection = null;
    class Rides{
        String customer;
        String driver;
        String ride_type;
        String source;
        String destination;
        String booked_on;
        String distance;
        String price;
        String dropzipcode;
        String pickupzipcode; 
        String status;
        String userRating;
        String driverRating;
        public Rides(String customer, String driver, String ride_type, String source, String destination, String booked_on, String distance, String price, String dropString, String pickupzipcode, String stauts, String userRating, String driverRating){
            this.customer = customer;
            this.driver = driver;
            this.ride_type = ride_type;
            this.source = source;
            this.destination = destination;
            this.booked_on = booked_on;
            this.distance = distance;
            this.price = price;
            this.dropzipcode = dropString;
            this.pickupzipcode = pickupzipcode;
            this.status = stauts;
            this.userRating = userRating;
            this.driverRating = driverRating;
        }
    }
    List<Rides> ridesList = new ArrayList<Rides>();
    private void connectDatabase() throws SQLException {
        try {
            Class.forName("com.mysql.jdbc.Driver");
        } catch (Exception e) {
            e.printStackTrace();
            throw new SQLException("Unable to instantiate JDBC Driver");
        }
        connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/RideShareDB?autoReconnect=true&useSSL=false", "root", "edenUbuntu");
    }
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setHeader("Access-Control-Allow-Origin", "*");
        PrintWriter printWriter = response.getWriter();
        Utility util = new Utility(request, printWriter);
        System.out.print("Book A Cab GET Request: ");
        JsonObject jsonObject =  Utility.getRequestJSON(request, gson);
        System.out.print(jsonObject);
        String username = jsonObject.get("driverName").getAsString();
        try {
            connectDatabase();
            PreparedStatement pst;
            pst = connection.prepareStatement("select * from rides where driver=?;");                
            pst.setString(1, username);
            System.out.print(pst);
            ResultSet rs = pst.executeQuery();

            while(rs.next()){
                System.out.println(rs.getString("customer"));
                System.out.println(rs.getString("driver"));
                System.out.println(rs.getString("ride_type"));
                System.out.println(rs.getString("source"));
                System.out.println(rs.getString("destination"));
                System.out.println(rs.getString("booked_on_date"));
                System.out.println(rs.getString("distance"));
                System.out.println(rs.getString("price"));

                var distance = Double.parseDouble(rs.getString("distance"));
                System.out.print("Distance"+distance);
                System.out.print("Distance / 4:"+(distance/4));
                String distanceString = Double.toString(distance);
                distanceString = distanceString+".00";
                String priceString;
                System.out.print(rs.getString("price"));
                if(distance<4){
                    priceString = "2.50";
                }else{
                    var price = Double.parseDouble(rs.getString("price"))*(distance/4);
                    priceString = Double.toString(price);
                }
                System.out.print("Price: "+priceString);
                Rides ride = new Rides(rs.getString("customer"),rs.getString("driver"),rs.getString("ride_type"),rs.getString("source"),rs.getString("destination"),rs.getString("booked_on_date"),rs.getString("distance"),rs.getString("price"),rs.getString("dropzipcode"),rs.getString("pickupzipcode"),rs.getString("status"),rs.getString("userRating"),rs.getString("driverRating"));
                ridesList.add(ride);
            }
            System.out.print(gson.toJson(ridesList));
            printWriter.println(gson.toJson(ridesList));
            ridesList.clear();
        } catch (SQLException e) {
            e.printStackTrace();
            response.setStatus(500);
            printWriter.println(gson.toJson("error"));
        } 
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setHeader("Access-Control-Allow-Origin", "*");
        PrintWriter printWriter = response.getWriter();
        Utility util = new Utility(request, printWriter);
        System.out.print("Book A Cab GET Request: ");
        try {
            connectDatabase();
            PreparedStatement pst;
            pst = connection.prepareStatement("select * from rides;");                
            System.out.print(pst);
            ResultSet rs = pst.executeQuery();

            while(rs.next()){
                System.out.println(rs.getString("customer"));
                System.out.println(rs.getString("driver"));
                System.out.println(rs.getString("ride_type"));
                System.out.println(rs.getString("source"));
                System.out.println(rs.getString("destination"));
                System.out.println(rs.getString("booked_on_date"));
                System.out.println(rs.getString("distance"));
                System.out.println(rs.getString("price"));

                var distance = Double.parseDouble(rs.getString("distance"));
                System.out.print("Distance"+distance);
                System.out.print("Distance / 4:"+(distance/4));
                String distanceString = Double.toString(distance);
                distanceString = distanceString+".00";
                String priceString;
                System.out.print(rs.getString("price"));
                if(distance<4){
                    priceString = "2.50";
                }else{
                    var price = Double.parseDouble(rs.getString("price"))*(distance/4);
                    priceString = Double.toString(price);
                }
                System.out.print("Price: "+priceString);
                Rides ride = new Rides(rs.getString("customer"),rs.getString("driver"),rs.getString("ride_type"),rs.getString("source"),rs.getString("destination"),rs.getString("booked_on_date"),rs.getString("distance"),rs.getString("price"),rs.getString("dropzipcode"),rs.getString("pickupzipcode"),rs.getString("status"),rs.getString("userRating"),rs.getString("driverRating"));
                ridesList.add(ride);
            }
            System.out.print(gson.toJson(ridesList));
            printWriter.println(gson.toJson(ridesList));
            ridesList.clear();
        } catch (SQLException e) {
            e.printStackTrace();
            response.setStatus(500);
            printWriter.println(gson.toJson("error"));
        } 
    }    
}