package com.application.projectGenerator.templateEngine;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Locale;
import java.util.Map;

import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import org.thymeleaf.context.IContext;


import org.thymeleaf.templateresolver.FileTemplateResolver;


import com.application.projectGenerator.services.GeneratorService;

public class ThymeleafEngine {
	
	public void convertTemplate(String pathToTemplate, String filename){
	final TemplateEngine templateEngine = new TemplateEngine();
	//final TemplateResolver templateResolver=new ClassLoaderTemplateResolver();
	FileTemplateResolver templateResolver = new FileTemplateResolver();

	//templateResolver.setPrefix("/"+GeneratorService.TEMPLATE_SERVER_DIR);
	//templateResolver.setSuffix(".java");
	templateResolver.setTemplateMode(FileTemplateResolver.DEFAULT_TEMPLATE_MODE.TEXT);
	templateEngine.addTemplateResolver(templateResolver);

	Map<String, Object> vars= new HashMap<String, Object>();

	Map<String, Object> ports=new LinkedHashMap<String, Object>();
	//ports.put("shutdown", "-1");
	vars.put("ports", "test"); // ports);
	final IContext ctx = new Context(Locale.FRENCH,vars);

	filename = pathToTemplate + "/" + GeneratorService.TEMPLATE_SERVER_DIR +  filename ;
	final String result = templateEngine.process(filename, ctx);

	System.out.println(result);
	}

}
