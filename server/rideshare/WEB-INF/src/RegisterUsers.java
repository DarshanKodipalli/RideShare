
// Handle RegiserUsers
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

@WebServlet("/RegiserUsers")

public class RegiserUsers extends HttpServlet {
    private static final long serialVersionUID = 5L;
    private static final Gson gson = new Gson();

    class Response {
        boolean error;
        String username;
        String usertype;
        String token;

        public Response() {
            this.error = true;
            this.username = null;
            this.usertype= null;
            this.token = null;
        }

        public Response(boolean error, String username, String usertype, String token) {
            this.error = error;
            this.username = username;
            this.usertype= usertype;
            this.token = token;
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
        response.addHeader("Access-Control-Allow-Credentials", "true");
        response.addHeader("Access-Control-Allow-Methods","GET,POST");
        response.addHeader("Access-Control-Allow-Headers","X-PINGOTHER, Origin, X-Requested-With, Content-Type, Accept, Cache-Control, Pragma");        
        PrintWriter printWriter = response.getWriter();
        Utility util = new Utility(request, printWriter);
        System.out.print("Login Post Request: ");
        JsonObject jsonObject =  Utility.getRequestJSON(request, gson);
        System.out.print(jsonObject);
        String username = jsonObject.get("username").getAsString();
        String password = jsonObject.get("password").getAsString();
        String usertype = jsonObject.get("usertype").getAsString();
        System.out.print(username);
        System.out.print(password);
        System.out.print(usertype);
        // Invalid Request
        if (username == null || username.isEmpty() || password == null || password.isEmpty()|| usertype == null || usertype.isEmpty()) {
            printWriter.println(gson.toJson(new Response()));
            return;
        }
        
        if (util.isLoggedin()) {
            Response resp = new Response(
                false, 
                util.getSessionUsername(),
                util.getSessionUsertype(),
                util.getSessionToken()
            );
            printWriter.println(gson.toJson(resp));
            return;
        } else {
            DatabaseAPI dbAPI = new DatabaseAPI();
            try {
                if (usertype.equalsIgnoreCase("driver")) {
                    Driver driver = dbAPI.getDriver(username);
                    if (driver != null && driver.getPassword().equals(password)) {
                        HttpSession session = request.getSession();
                        session.setAttribute("username", username);
                        session.setAttribute("usertype", "driver");

                        String token = UUID.randomUUID().toString();

                        session.setAttribute("token", token);
                        
                        Response resp = new Response(
                            false, 
                            username,
                            "driver",
                            token
                        );
                        printWriter.println(gson.toJson(resp));
                    } else {
                        printWriter.println(gson.toJson(new Response()));
                        return;
                    }
                } else {
                    User user = dbAPI.getUser(username);
                    if (user != null) {
                        if (user.getPassword().equals(password)) {
                            if (usertype.equalsIgnoreCase("admin") && !user.getIsSuperuser()) {
                                printWriter.println(gson.toJson(new Response()));
                                return;
                            }

                            HttpSession session = request.getSession();
                            session.setAttribute("username", username);
                            session.setAttribute("usertype", usertype);

                            String token = UUID.randomUUID().toString();

                            session.setAttribute("token", token);
                            
                            Response resp = new Response(
                                false, 
                                username,
                                usertype,
                                token
                            );

                            printWriter.println(gson.toJson(resp));
                        } else {
                            printWriter.println(gson.toJson(new Response()));
                            return;
                        }
                    } else {
                        printWriter.println(gson.toJson(new Response()));
                        return;
                    }
                }
            } catch (SQLException e) {
                e.printStackTrace();
                response.setStatus(500);
                printWriter.println(gson.toJson(new Response()));
            } 
        }
    }
}