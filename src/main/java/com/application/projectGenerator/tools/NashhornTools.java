package com.application.projectGenerator.tools;


import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;

public class NashhornTools {

    public static Object eval(String expression, String variable) {
        ScriptEngine engine = new ScriptEngineManager().getEngineByName("nashorn");
        Object result= null;
        try {
            engine.eval("window = {}");
            engine.eval( "load('classpath:templates/generator-constants.js');");
            engine.eval( "load('classpath:templates/files.js');");
            engine.eval("load('classpath:" +
                    "META-INF/resources/webjars/ejs/2.6.1/ejs-v2.6.1/ejs.js');");
           // return (String) engine.eval("window.ejs.render(template, modelProxy)");
            //engine.eval("var result = 3*4;");
            //result = engine.get("result");
        } catch (ScriptException e) {
            e.printStackTrace();
        }
        return result;
    }
}
