/**
 * PERRAUDEAU
 * $Id
 */
package com.application.projectGenerator.exceptions;

/**
 * Exception
 * @author Perraudeau
 *
 */
public class BusinessException extends Exception {

	private static final long serialVersionUID = -9125939439166420000L;

	String methodName;
	String message;
	Exception exception;
	
	/**
	 * BusinessException
	 * @param methodName
	 * @param message
	 * @param e
	 */
	public BusinessException(String methodName, String message, Exception e) {
		    super();
		    this.exception = e;
		    this.methodName= methodName;
		    this.message = message;
		    
		    /*
		    if (e.getCause() != null) {
		    	System.out.println("[BusinessException] Error in " + methodName + " : " + e.getCause());
		    	System.out.println(e.getMessage());
		    } else {
		    	System.out.println("[BusinessException] Error in " + methodName + " : " + e);
		    	System.out.println(e.getMessage());
		    }
		    */
	}

	public String getMethodName() {
		return methodName;
	}

	public void setMethodName(String methodName) {
		this.methodName = methodName;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Exception getException() {
		return exception;
	}

	public void setException(Exception exception) {
		this.exception = exception;
	}

}
