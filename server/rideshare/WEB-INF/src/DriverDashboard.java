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

@WebServlet("/DriverDashboard")

public class DriverDashboard extends HttpServlet {
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

        JsonObject jsonObject =  Utility.getRequestJSON(request, gson);

        String username = jsonObject.get("username").getAsString();

        try {
            HashMap<String, ArrayList<HashMap>> mainmap =new HashMap();
            ArrayList<HashMap> pickUpList=new ArrayList<>();
            ArrayList<HashMap> dropList=new ArrayList<>();
            ArrayList<HashMap> bookedOnList=new ArrayList<>();
            ArrayList<HashMap> wagesList=new ArrayList<>();

            connectDatabase();
            PreparedStatement pst = connection.prepareStatement("select count(*) as pickUpsFrom, pickupzipcode from rides where driver=? group by pickupzipcode order by pickUpsFrom desc limit 5;");
            pst.setString(1, username);

            ResultSet rs = pst.executeQuery();

            while(rs.next()){
                HashMap<String,String> map=new HashMap<>();
                map.put("pickUpsFrom", rs.getString("pickUpsFrom"));
                map.put("pickupzipcode", rs.getString("pickupzipcode"));
                pickUpList.add(map);
            }

            PreparedStatement pst2 = connection.prepareStatement("select count(*) as dropsTo, dropzipcode from rides where driver=? group by dropzipcode order by dropsTo desc limit 5;");
            pst2.setString(1, username);

            ResultSet rs2 = pst2.executeQuery();

            while(rs2.next()){
                HashMap<String,String> map=new HashMap<>();
                map.put("dropsTo", rs2.getString("dropsTo"));
                map.put("dropzipcode", rs2.getString("dropzipcode"));
                dropList.add(map);
            }

            PreparedStatement pst4 = connection.prepareStatement("select count(*) as bookedOnCount, DATE_FORMAT(booked_on_date, '%e %b, %Y') as booked_on_date from rides where driver=? group by booked_on_date order by bookedOnCount desc;");
            pst4.setString(1, username);
            ResultSet rs4 = pst4.executeQuery();

            while(rs4.next()){
                HashMap<String,String> map=new HashMap<>();
                map.put("bookedOnCount", rs4.getString("bookedOnCount"));
                map.put("booked_on_date", rs4.getString("booked_on_date"));
                bookedOnList.add(map);
            }

            PreparedStatement pst5 = connection.prepareStatement("select sum(price) as wage, DATE_FORMAT(booked_on_date, '%e %b, %Y') as booked_on_date from rides where driver=? group by booked_on_date;");
            pst5.setString(1, username);
            ResultSet rs5 = pst5.executeQuery();

            while(rs5.next()){
                HashMap<String,String> map=new HashMap<>();
                map.put("wage", rs5.getString("wage"));
                map.put("booked_on_date", rs5.getString("booked_on_date"));
                wagesList.add(map);
            }

             mainmap.put("pickUpList",pickUpList);
             mainmap.put("dropList",dropList);
             mainmap.put("bookedOnList",bookedOnList);
             mainmap.put("wagesList",wagesList);

            printWriter.println(gson.toJson(mainmap));
        } catch (SQLException e) {
            e.printStackTrace();
            response.setStatus(500);
            printWriter.println(gson.toJson("error"));
        }
    }
}
