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


@WebServlet("/Dashboard")

public class Dashboard extends HttpServlet {
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
        System.out.print("Book A Cab GET Request: ");
        JsonObject jsonObject =  Utility.getRequestJSON(request, gson);
        System.out.print(jsonObject);
        String username = jsonObject.get("username").getAsString();
        System.out.println(username);
        try {
            connectDatabase();
            PreparedStatement pst = connection.prepareStatement("select count(*) as pickUpsFrom, pickupzipcode from rides where customer=? group by pickupzipcode order by pickUpsFrom desc limit 5;");
            pst.setString(1, username);

            HashMap<String, ArrayList<HashMap>> mainmap =new HashMap();

            ResultSet rs = pst.executeQuery();

            ArrayList<HashMap> pickUpList=new ArrayList<>();
            ArrayList<HashMap> dropList=new ArrayList<>();
            ArrayList<HashMap> rideTypeList=new ArrayList<>();
            ArrayList<HashMap> bookedOnList=new ArrayList<>();
            ArrayList<HashMap> cancelledOnList=new ArrayList<>();
            ArrayList<HashMap> ridesWithDrivers=new ArrayList<>();

            while(rs.next()){
                HashMap<String,String> map=new HashMap<>();
                map.put("pickUpsFrom", rs.getString("pickUpsFrom"));
                map.put("pickupzipcode", rs.getString("pickupzipcode"));
                pickUpList.add(map);
            }

            PreparedStatement pst2 = connection.prepareStatement("select count(*) as dropsTo, dropzipcode from rides where customer=? group by dropzipcode order by dropsTo desc limit 5;;");
            pst2.setString(1, username);
            ResultSet rs2 = pst2.executeQuery();

            while(rs2.next()){
                HashMap<String,String> map=new HashMap<>();
                map.put("dropsTo", rs2.getString("dropsTo"));
                map.put("dropzipcode", rs2.getString("dropzipcode"));
                dropList.add(map);
            }

            PreparedStatement pst3 = connection.prepareStatement("select avg(userRating) as rating, driver from rides where customer=? group by driver desc;");
            pst3.setString(1, username);
            ResultSet rs3 = pst3.executeQuery();
            while(rs3.next()){
                HashMap<String,String> map=new HashMap<>();
                map.put("rideTypeCount", rs3.getString("driver"));
                map.put("ride_type", rs3.getString("rating"));
                rideTypeList.add(map);
            }

            PreparedStatement pst4 = connection.prepareStatement("select count(*) as bookedOnCount, DATE_FORMAT(booked_on_date, '%e %b, %Y') as booked_on_date from rides where customer=? group by booked_on_date desc;");
            pst4.setString(1, username);
            ResultSet rs4 = pst4.executeQuery();
            while(rs4.next()){

                HashMap<String,String> map=new HashMap<>();
                map.put("bookedOnCount", rs4.getString("bookedOnCount"));
                map.put("booked_on_date", rs4.getString("booked_on_date"));

                bookedOnList.add(map);
            }

            PreparedStatement pst5 = connection.prepareStatement("select count(*) as cancelledOn, DATE_FORMAT(cancelled_on_date, '%e %b, %Y') as cancelled_on_date from rides where customer=? and cancelled_on_date is not null group by cancelled_on_date desc;");
            pst5.setString(1, username);
            System.out.print(pst5);
            ResultSet rs5 = pst5.executeQuery();

            while(rs5.next()){
                HashMap<String,String> map=new HashMap<>();
                map.put("cancelledOn", rs5.getString("cancelledOn"));
                map.put("cancelled_on_date", rs5.getString("cancelled_on_date"));
                cancelledOnList.add(map);
            }

            PreparedStatement pst6 = connection.prepareStatement("select count(*) as count, driver from rides where customer=? group by driver desc;");
            pst6.setString(1, username);
            ResultSet rs6 = pst6.executeQuery();
            while(rs6.next()){
                HashMap<String,String> map=new HashMap<>();
                map.put("rideCount", rs6.getString("count"));
                map.put("driver", rs6.getString("driver"));
                ridesWithDrivers.add(map);
            }

             mainmap.put("pickUpList",pickUpList);
             mainmap.put("rideTypeList",rideTypeList);
             mainmap.put("dropList",dropList);
             mainmap.put("bookedOnList",bookedOnList);
             mainmap.put("cancelledOnList",cancelledOnList);
             mainmap.put("ridesWithDrivers",ridesWithDrivers);

            printWriter.println(gson.toJson(mainmap));
        } catch (SQLException e) {
            e.printStackTrace();
            response.setStatus(500);
            printWriter.println(gson.toJson("error"));
        }
    }
}