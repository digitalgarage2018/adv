package it.iseed.entities;

public class JsonResponseBody {

	public JsonResponseBody() {
		super();
		// TODO Auto-generated constructor stub
	}
	public JsonResponseBody(int server, Object response) {
		super();
		this.server = server;
		this.response = response;
	}

    private int server;

    private Object response;
    
	public int getServer() {
		return server;
	}
	public void setServer(int server) {
		this.server = server;
	}
	public Object getResponse() {
		return response;
	}
	public void setResponse(Object response) {
		this.response = response;
	}

}