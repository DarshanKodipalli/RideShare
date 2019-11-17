// Handle Registration
import java.io.PrintWriter;
import java.sql.SQLException;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import com.mysql.jdbc.exceptions.jdbc4.MySQLIntegrityConstraintViolationException;
import com.google.gson.Gson;
import com.google.gson.JsonObject;

@WebServlet("/Register")

public class Register extends HttpServlet {
    private static final long serialVersionUID = 4L;
    private static final Gson gson = new Gson();

    class Response {
        boolean error;
        boolean registered;
        String username;
        String usertype;
        String msg;

        public Response() {
            this.error = true;
            this.registered = false;
            this.msg = "";
            this.username = null;
            this.usertype = null;
        }

        public Response(boolean error, boolean registered, String username, String usertype, String msg) {
            this.error = error;
            this.registered = registered;
            this.username = username;
            this.usertype = usertype;
            this.msg = msg;
        }
    }

    private Response isRegistered(String username, String usertype) throws SQLException {
        DatabaseAPI dbAPI = new DatabaseAPI();

        if (usertype.equalsIgnoreCase("driver")) {
            Driver driver = dbAPI.getDriver(username);
            if (driver != null) {
                return new Response(
                    false, true, username, usertype, "Driver: " + username + " is registered."
                );
            }
            return new Response(
                false, false, username, usertype, "Driver: " + username + " is not registered."
            );
        } else {
            User user = dbAPI.getUser(username);
            if (user != null) {
                return new Response(
                    false, true, username, usertype, "User: " + username + " is registered."
                );
            }
            return new Response(
                false, false, username, usertype, "User: " + username + " is not registered."
            );
        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        // Is User Registered?
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setHeader("Access-Control-Allow-Origin", "*");
        PrintWriter printWriter = response.getWriter();
        Utility util = new Utility(request, printWriter);
        Response resp = new Response();

        try{
            JsonObject jsonObject =  Utility.getRequestJSON(request, gson);
            String username = jsonObject.get("username").getAsString();
            String usertype = jsonObject.get("usertype").getAsString();

            if (username ==null || username.isEmpty() || usertype == null || usertype.isEmpty()) {
                response.setStatus(400);
                resp = new Response(
                    true, false, "", "", "400: Invalid Request Parameters"
                );
            }

            resp = isRegistered(username, usertype);

            response.setStatus(200);
        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus(500);
            resp = new Response(
                true, false, "", "", "500: Internal Server Error"
            );
        } finally {
            printWriter.println(gson.toJson(resp));
            printWriter.close();
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        // User Registeration
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setHeader("Access-Control-Allow-Origin", "*");
        PrintWriter printWriter = response.getWriter();
        Utility util = new Utility(request, printWriter);

        String usertype = "";
            
        // Common details for all users
        String username = "";
        String email = "";
        String password = "";
        String phone = "";

        // Driver
        String car = "";
        String license = "";

        // Customer & Admin
        String creditCard = "";

        try {
            JsonObject jsonObject =  Utility.getRequestJSON(request, gson);
            usertype = jsonObject.get("usertype").getAsString();
            
            // Common details for all users
            username = jsonObject.get("username").getAsString();
            email = jsonObject.get("email").getAsString();
            password = jsonObject.get("password").getAsString();
            phone = jsonObject.get("phone").getAsString();

            boolean paramError = false;
            if (
                username == null || email == null || password == null || phone == null || usertype == null ||
                username.isEmpty() || email.isEmpty() || password.isEmpty() || phone.isEmpty() || usertype.isEmpty()
            ) {
                paramError = true;
            }

            if (usertype.equalsIgnoreCase("driver")) {
                car = jsonObject.get("car").getAsString();
                license = jsonObject.get("license").getAsString();
                if (car ==  null || license == null || car.isEmpty() || license.isEmpty()) {
                    paramError = true;
                }
            } else {
                creditCard = jsonObject.get("creditCard").getAsString();
                if (creditCard == null || creditCard.isEmpty()) {
                    paramError = true;
                }
            }

            if (paramError) {
                response.setStatus(400);
                Response resp = new Response(
                    true, false, username, usertype, "400: Invalid Request Parameters"
                );
                printWriter.println(gson.toJson(resp));
                printWriter.close();
                return;
            }
        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus(400);
            Response resp = new Response(
                true, false, username, usertype, "400: Invalid Request Parameters"
            );
            printWriter.println(gson.toJson(resp));
            printWriter.close();
            return;
        }

        Response resp = new Response();

        try {
            if (util.isLoggedin()) {
                response.setStatus(200);
                resp = new Response(
                    false, false, username, usertype, "Please logout to register a new account."
                );
                return;
            }

            DatabaseAPI dbAPI = new DatabaseAPI();
            if (usertype.equalsIgnoreCase("driver")) {
                dbAPI.insertDriver(username, email, password, phone, car, license);
                resp = new Response(
                    false, true, username, usertype, "Driver: " + username + " registered."
                );
            } else {
                if (usertype.equalsIgnoreCase("admin")) {
                    dbAPI.insertUser(username, email, password, creditCard, phone, true);
                    resp = new Response(
                        false, true, username, usertype, "Admin: " + username + " registered."
                    );
                } else {
                    dbAPI.insertUser(username, email, password, creditCard, phone, false);
                    resp = new Response(
                        false, true, username, usertype, "Customer: " + username + " registered."
                    );
                }
            }
            response.setStatus(201);
        } catch (MySQLIntegrityConstraintViolationException e) {
            response.setStatus(200);
            resp = new Response(
                true, true, username, usertype, "User: " + username + " already registered."
            );
        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus(500);
            resp = new Response(
                true, false, "", "", "500: Internal Server Error"
            );
        } finally {
            printWriter.println(gson.toJson(resp));
            printWriter.close();
        }
    }
}