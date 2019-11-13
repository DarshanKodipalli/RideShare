// Class to represent a User

class User {
    private int id;
    private String username;
    private String email;
    private String password;
    private String creditCard;
    private String phone;
    private double rating;
    private boolean isSuperuser;

    public User() {
        this.id = -1;
        this.username = "";
        this.email = "";
        this.password = "";
        this.creditCard = "";
        this.phone = "";
        this.rating = 0.0;
        this.isSuperuser = false;
    }

    public User(int id, String username, String email, String password, String creditCard, String phone, double rating, boolean isSuperuser) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.creditCard = creditCard;
        this.phone = phone;
        this.rating = rating;
        this.isSuperuser = isSuperuser;
    }

    public int getUid() {
        return this.id;
    }

    public void setUid(int id) {
        this.id = id;
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getCreditCard() {
        return this.creditCard;
    }

    public void setCreditCard(String creditCard) {
        this.creditCard = creditCard;
    }

    public String getPhone() {
        return this.phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public double getRating() {
        return this.rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public boolean getIsSuperuser() {
        return this.isSuperuser;
    }

    public void setIsSuperuser(boolean isSuperuser) {
        this.isSuperuser = isSuperuser;
    };
    
}