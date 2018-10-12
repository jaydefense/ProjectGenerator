/**
 * PERRAUDEAU
 * date de creation: 2015/03/06
 * $Id
 */
package com.application.projectGenerator;

import com.application.projectGenerator.bean.Stack;
import com.application.projectGenerator.dto.Project;
import com.application.projectGenerator.exceptions.BusinessException;
import com.application.projectGenerator.services.GeneratorService;
import com.application.projectGenerator.templateEngine.ThymeleafEngine;
import com.application.projectGenerator.tools.FileTools;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Convertisseur De fichier CSV en JSON/XML
 * @author PERRAUDEAU
 *
 */
public class App 
{

	/**
	 * Convertisseur CSV
	 * Chemin du fichier texte
	 * Format de sortie (XLM/JSON)
	 * Chemin du fichier en sortie
	 * @param args
	 */
    public static void main( String[] args )
    {
   	 	//verification des parametres
    		if (args.length != 1) {
            	System.out.println("Parametre incorrects: -Fichier json");
            	System.exit(1);
    		}
    		String fileNameIn = args[0];
    		
    		// test 
    		ThymeleafEngine th = new ThymeleafEngine();
    		th.convertTemplate("src/main/resources/templates/server", "_pom.xml");

    		// test2
			// lecture du fichier des regles
		try {
			String rules = FileTools.readFile("src/main/resources/regles_generation_hipster_test.txt");

			//create ObjectMapper instance
			ObjectMapper objectMapper = new ObjectMapper();
			Stack stack = objectMapper.readValue(rules , Stack.class);
			System.out.println(objectMapper );
		} catch (Exception e) {
			e.printStackTrace();
		}


		GeneratorService generatorService = new GeneratorService();
    		Project project;
			try {
				project = generatorService.loadSchema(fileNameIn);
				generatorService.templateBaseApplication(project);
	    		//generatorService.writeTemplate(project); 
			} catch (BusinessException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
    }
}
