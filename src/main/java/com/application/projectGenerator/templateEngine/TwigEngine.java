package com.application.projectGenerator.templateEngine;



import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;

import org.jtwig.JtwigModel;
import org.jtwig.JtwigTemplate;

import com.application.projectGenerator.dto.Project;
import com.application.projectGenerator.dto.Repository;
import com.application.projectGenerator.exceptions.BusinessException;
import com.application.projectGenerator.tools.FileTools;



public class TwigEngine {
	
	public String convertTemplate(String filename, Repository repository, Project project){
		 JtwigTemplate template = JtwigTemplate.classpathTemplate(filename);
	     JtwigModel model = JtwigModel.newModel().with("repository", repository).with("project", project);

	     return template.render(model);
	}
	
	public void copyTemplate (String src, String dest, Project project) throws BusinessException {
		try {
			JtwigTemplate template = JtwigTemplate.classpathTemplate(src);
			JtwigModel model = JtwigModel.newModel().with("project", project);
			FileOutputStream outputStream = new FileOutputStream(dest);
			template.render(model,outputStream);
		} catch (Exception e) {
			throw new BusinessException("copyTemplate", "Template interpretaton failed", e);
		}
	}
	
	public void copyTemplate (String filename, String directorySrc, String directoryDest, String packageDir, Project project) throws BusinessException {
		try {
			File fileSrc = new File(filename);
			System.out.println(fileSrc.getAbsolutePath());
			JtwigTemplate template = JtwigTemplate.fileTemplate(fileSrc);
			JtwigModel model = JtwigModel.newModel().with("project", project);
			String filenameDest =filename.replace(directorySrc, directoryDest).replace("package", packageDir).replaceFirst("_", "");
			//check directory
			String dir = filenameDest.substring(0, filenameDest.lastIndexOf("/"));
			FileTools.createDirectory(dir);
			File file = new File(filenameDest);
			System.out.println(file.getAbsolutePath());
			FileOutputStream outputStream = new FileOutputStream(file);
			template.render(model,outputStream);
		} catch (Exception e) {
			throw new BusinessException("copyTemplate", "Template interpretaton failed", e);
		}
	}	
}
