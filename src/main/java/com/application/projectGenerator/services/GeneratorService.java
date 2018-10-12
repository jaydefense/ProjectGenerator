package com.application.projectGenerator.services;

import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.List;

import com.application.projectGenerator.dto.Controlleur;
import com.application.projectGenerator.dto.Project;
import com.application.projectGenerator.dto.Repository;
import com.application.projectGenerator.dto.Service;
import com.application.projectGenerator.dto.View;
import com.application.projectGenerator.exceptions.BusinessException;
import com.application.projectGenerator.templateEngine.ThymeleafEngine;
import com.application.projectGenerator.templateEngine.TwigEngine;
import com.application.projectGenerator.tools.FileTools;
import com.fasterxml.jackson.databind.ObjectMapper;

public class GeneratorService {

	// public static String TEMPLATE_SERVER_DIR="src/main/resources/templates/server/";
	public static String TEMPLATE_SERVER_DIR="./";
	public static String PROJECT_SERVER_OUTPUT_DIR="output/";
	public static String SOURCE_JAVA_DIR= "src/main/java/";
	public static String RESOURCE_DIR= "src/main/resources/";
	public static String TEST_DIR= "src/test";
			
	public Project loadSchema(String fileNameIn) throws BusinessException {
	   	
    	String jsonContent;
    	Project project;    	

    	try {
 			
        	// load json file
			jsonContent = FileTools.readFile(fileNameIn);

			//create ObjectMapper instance
			ObjectMapper objectMapper = new ObjectMapper();
			
			//convert json string to object
			project = objectMapper.readValue(jsonContent , Project.class);

		} catch (BusinessException e) {
        	throw e;
		}
    	catch (Exception e) {
	    	throw new BusinessException("loadSchema", e.getCause().getMessage(), e);
		}
    	return project;
	}
	
	public void writeTemplate(Project project) throws BusinessException {
		String fileContent;
		String packageDir = project.getProjectPackage().replace(".", "/");
		//write project basis
		
		
		//write services
		if (project.getServices() !=null) {
			for (Service service : project.getServices() ) {
				
			}
		}
		
		//write repository
		if (project.getRepositories() !=null) {
			//fileContent=FileTools.readFile(TEMPLATE_SERVER_DIR+SOURCE_JAVA_DIR + "/package/repository/_Repository.java");
			FileTools.createDirectory(PROJECT_SERVER_OUTPUT_DIR+"/"+packageDir+"/repository");	
			TwigEngine engine = new TwigEngine();
			
			for (Repository repository : project.getRepositories() ) {
				fileContent = engine.convertTemplate(TEMPLATE_SERVER_DIR+ "/" + SOURCE_JAVA_DIR +"/package/repository/_Repository.java",repository,project);
				FileTools.saveFile(PROJECT_SERVER_OUTPUT_DIR+"/"+ packageDir +"/repository/"+ repository.getName()+"Repository.java", fileContent, false);
			}
		}
		//write controlleurs
		if (project.getControlleurs() !=null) {
			for (Controlleur controller : project.getControlleurs() ) {
				
			}
		}
		
		//write views
		if (project.getViews() != null) {
			for (View view : project.getViews() ) {
				
			}
			
		}
	}
	
	public void writeBaseApplication(Project project) {
		TwigEngine engine = new TwigEngine();
		String packageDir = project.getProjectPackage().replace(".", "/");
		
		try {
			FileTools.createDirectory(PROJECT_SERVER_OUTPUT_DIR);
			engine.copyTemplate(TEMPLATE_SERVER_DIR +"_mvnw",PROJECT_SERVER_OUTPUT_DIR+ "mvnw",project);
			engine.copyTemplate(TEMPLATE_SERVER_DIR +"_mvnw.cmd", PROJECT_SERVER_OUTPUT_DIR+"mvnw.cmd",project);
			engine.copyTemplate(TEMPLATE_SERVER_DIR +"_pom.xml",PROJECT_SERVER_OUTPUT_DIR+ "pom.xml",project);
			
			// Create Java resource files
			FileTools.createDirectory(PROJECT_SERVER_OUTPUT_DIR+SOURCE_JAVA_DIR+ packageDir);
			FileTools.createDirectory(PROJECT_SERVER_OUTPUT_DIR+ RESOURCE_DIR);

			if ("ehcache".equals(project.getDatabase().getHibernateCache() ) ) {
				engine.copyTemplate(TEMPLATE_SERVER_DIR + RESOURCE_DIR + "_ehcache.xml", PROJECT_SERVER_OUTPUT_DIR + RESOURCE_DIR + "ehcache.xml", project);
			}

			
			// Thymeleaf templates

			
			engine.copyTemplate(TEMPLATE_SERVER_DIR + RESOURCE_DIR + "_logback-spring.xml", PROJECT_SERVER_OUTPUT_DIR + RESOURCE_DIR + "_logback-spring.xml", project);
			
			FileTools.createDirectory(PROJECT_SERVER_OUTPUT_DIR + RESOURCE_DIR +"/config");
			engine.copyTemplate(TEMPLATE_SERVER_DIR + RESOURCE_DIR + "config/_application.yml", PROJECT_SERVER_OUTPUT_DIR+ RESOURCE_DIR + "config/_application.yml", project);
			engine.copyTemplate(TEMPLATE_SERVER_DIR + RESOURCE_DIR + "config/_application-dev.yml", PROJECT_SERVER_OUTPUT_DIR+ RESOURCE_DIR + "config/_application-dev.yml", project);
			engine.copyTemplate(TEMPLATE_SERVER_DIR + RESOURCE_DIR + "config/_application-dev.yml", PROJECT_SERVER_OUTPUT_DIR+ RESOURCE_DIR + "config/_application-dev.yml", project);

			//security
			FileTools.createDirectory(PROJECT_SERVER_OUTPUT_DIR+ SOURCE_JAVA_DIR + packageDir + "/security");
			engine.copyTemplate(TEMPLATE_SERVER_DIR + SOURCE_JAVA_DIR + "package/security/_SpringSecurityAuditorAware.java", PROJECT_SERVER_OUTPUT_DIR + SOURCE_JAVA_DIR + packageDir + "/security/SpringSecurityAuditorAware.java", project);
			engine.copyTemplate(TEMPLATE_SERVER_DIR + SOURCE_JAVA_DIR + "package/security/_SpringSecurityAuditorAware.java", PROJECT_SERVER_OUTPUT_DIR + SOURCE_JAVA_DIR + packageDir + "/security/SpringSecurityAuditorAware.java", project);
			engine.copyTemplate(TEMPLATE_SERVER_DIR + SOURCE_JAVA_DIR + "package/security/_SecurityUtils.java"             , PROJECT_SERVER_OUTPUT_DIR + SOURCE_JAVA_DIR + packageDir + "/security/SecurityUtils.java", project);
			engine.copyTemplate(TEMPLATE_SERVER_DIR + SOURCE_JAVA_DIR + "package/security/_AuthoritiesConstants.java"      , PROJECT_SERVER_OUTPUT_DIR + SOURCE_JAVA_DIR + packageDir + "/security/AuthoritiesConstants.java", project);
			engine.copyTemplate(TEMPLATE_SERVER_DIR + SOURCE_JAVA_DIR + "package/config/_SecurityConfiguration.java"       , PROJECT_SERVER_OUTPUT_DIR + SOURCE_JAVA_DIR + packageDir + "config/SecurityConfiguration.java", project);
			engine.copyTemplate(TEMPLATE_SERVER_DIR + SOURCE_JAVA_DIR + "package/domain/_PersistentToken.java"             , PROJECT_SERVER_OUTPUT_DIR + SOURCE_JAVA_DIR + packageDir + "domain/PersistentToken.java", project);
			engine.copyTemplate(TEMPLATE_SERVER_DIR + SOURCE_JAVA_DIR + "package/repository/_PersistentTokenRepository.java",PROJECT_SERVER_OUTPUT_DIR + SOURCE_JAVA_DIR + packageDir + "repository/PersistentTokenRepository.java", project);
			engine.copyTemplate(TEMPLATE_SERVER_DIR + SOURCE_JAVA_DIR + "package/security/_Http401UnauthorizedEntryPoint.java" , PROJECT_SERVER_OUTPUT_DIR + SOURCE_JAVA_DIR + packageDir + "security/Http401UnauthorizedEntryPoint.java", project);
			engine.copyTemplate(TEMPLATE_SERVER_DIR + SOURCE_JAVA_DIR + "package/security/_UserDetailsService.java"        , PROJECT_SERVER_OUTPUT_DIR + SOURCE_JAVA_DIR + packageDir + "security/UserDetailsService.java", project);
			engine.copyTemplate(TEMPLATE_SERVER_DIR + SOURCE_JAVA_DIR + "package/security/_UserNotActivatedException.java" , PROJECT_SERVER_OUTPUT_DIR + SOURCE_JAVA_DIR + packageDir + "security/UserNotActivatedException.java", project);
			engine.copyTemplate(TEMPLATE_SERVER_DIR + SOURCE_JAVA_DIR + "package/security/_AjaxAuthenticationFailureHandler.java", PROJECT_SERVER_OUTPUT_DIR + SOURCE_JAVA_DIR + packageDir + "security/AjaxAuthenticationFailureHandler.java", project);
			engine.copyTemplate(TEMPLATE_SERVER_DIR + SOURCE_JAVA_DIR + "package/security/_AjaxAuthenticationSuccessHandler.java", PROJECT_SERVER_OUTPUT_DIR + SOURCE_JAVA_DIR + packageDir + "security/AjaxAuthenticationSuccessHandler.java", project);
			engine.copyTemplate(TEMPLATE_SERVER_DIR + SOURCE_JAVA_DIR + "package/security/_AjaxLogoutSuccessHandler.java"        , PROJECT_SERVER_OUTPUT_DIR + SOURCE_JAVA_DIR + packageDir + "security/AjaxLogoutSuccessHandler.java", project);
			engine.copyTemplate(TEMPLATE_SERVER_DIR + SOURCE_JAVA_DIR + "package/security/_CustomPersistentRememberMeServices.java", PROJECT_SERVER_OUTPUT_DIR + SOURCE_JAVA_DIR + packageDir + "security/CustomPersistentRememberMeServices.java", project);
			
			
		} catch (BusinessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public void templateBaseApplication(Project project) {
		TwigEngine engine = new TwigEngine();
		String packageDir = project.getProjectPackage().replace(".", "/");
		List<String> listFile = new ArrayList<String>();
		
		try {		
			// lecture du repertoire source
			listFile.addAll( FileTools.listDirectory(TEMPLATE_SERVER_DIR + RESOURCE_DIR, "^(_).*"));
			listFile.addAll( FileTools.listDirectory(TEMPLATE_SERVER_DIR + RESOURCE_DIR + "config", "^(_).*"));
			listFile.addAll( FileTools.listDirectory(TEMPLATE_SERVER_DIR + SOURCE_JAVA_DIR + "package", "^(_).*"));
			listFile.addAll( FileTools.listDirectory(TEMPLATE_SERVER_DIR + SOURCE_JAVA_DIR + "package/aop/logging", "^(_).*"));
			listFile.addAll( FileTools.listDirectory(TEMPLATE_SERVER_DIR + SOURCE_JAVA_DIR + "package/async", "^(_).*"));
			listFile.addAll( FileTools.listDirectory(TEMPLATE_SERVER_DIR + SOURCE_JAVA_DIR + "package/config", "^(_).*"));
			listFile.addAll( FileTools.listDirectory(TEMPLATE_SERVER_DIR + SOURCE_JAVA_DIR + "package/security", "^(_).*"));
			listFile.addAll( FileTools.listDirectory(TEMPLATE_SERVER_DIR + SOURCE_JAVA_DIR + "package/service", "^(_).*"));
			listFile.addAll( FileTools.listDirectory(TEMPLATE_SERVER_DIR + SOURCE_JAVA_DIR + "package/webs", "^(_).*"));
			
			for (String filename : listFile) {
				engine.copyTemplate(filename,TEMPLATE_SERVER_DIR, PROJECT_SERVER_OUTPUT_DIR, packageDir, project);
			}
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}		
	}
}
