// Handle Registration
import java.io.PrintWriter;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import com.google.gson.Gson;
import com.google.gson.JsonObject;

@WebServlet("/Register")

public class Register extends HttpServlet {
    private static final long serialVersionUID = 4L;
    private static final Gson gson = new Gson();

    class Response {
        boolean error;
        String username;
        String usertype;

        public Response() {
            this.error = true;
            this.username = null;
            this.usertype = null;
        }

        public Response(boolean error, String username, String usertype, String token) {
            this.error = error;
            this.username = username;
            this.usertype = usertype;
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

    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        // User Registeration
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setHeader("Access-Control-Allow-Origin", "*");
        PrintWriter printWriter = response.getWriter();
        Utility util = new Utility(request, printWriter);
        JsonObject jsonObject =  Utility.getRequestJSON(request, gson);
    }
}