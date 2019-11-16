
// Handle Login
import java.io.PrintWriter;
import java.util.HashMap;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.gson.Gson;
import com.google.gson.JsonObject;

@WebServlet("/Logout")

public class Logout extends HttpServlet {
    private static final long serialVersionUID = 5L;
    private static final Gson gson = new Gson();

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setHeader("Access-Control-Allow-Origin", "*");
        PrintWriter printWriter = response.getWriter();
        Utility util = new Utility(request, printWriter);

        JsonObject jsonObject =  Utility.getRequestJSON(request, gson);

        String username = jsonObject.get("username").getAsString();
        String token = jsonObject.get("token").getAsString();
        HashMap<String, Boolean> resp = new HashMap<>();

        // Invalid Request
        if (username == null || username.isEmpty() || token == null || token.isEmpty()) {
            resp.put("logout", false);
            printWriter.println(gson.toJson(resp));
            return;
        }
        
        util.logout();
        resp.put("logout", true);
        printWriter.println(gson.toJson(resp));
    }
}