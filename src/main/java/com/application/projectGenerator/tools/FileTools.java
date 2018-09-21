/**
 * PERRAUDEAU
 * $Id
 */
package com.application.projectGenerator.tools;


import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.util.ArrayList;
import java.util.List;

import com.application.projectGenerator.exceptions.BusinessException;

/**
 * Outils pour gestion de fichiers
 * @author Perraudeau
 *
 */
public class FileTools {
	
	/**
	 * Sauvegarde
	 * @param fileName
	 * @param content
	 * @param append
	 * @throws BusinessException
	 */
	 public static void saveFile(String fileName, String content, boolean append) throws BusinessException {
		 try {
			FileWriter fileWriter = new FileWriter(fileName,append);
			fileWriter.write(content);
			fileWriter.flush();
			fileWriter.close();
		 } catch (Exception e) {
			 throw new BusinessException("saveFile", "Impossible d'ecrire le fichier cible", e);
		 }
	 }
	 
	 /**
	  * Chargement
	  * @param fileName
	  * @return
	  * @throws BusinessException
	  */
	 public static String readFile(String fileName) throws BusinessException {
		 String content="";
		 try {
			 BufferedReader in = new BufferedReader(new FileReader(fileName));
			 String str;
			 while ((str=in.readLine()) != null) {
				 content = content + str + "\n";
			 }
			 in.close();
		 } catch (Exception e) {
			 throw new BusinessException("readFile", "Impossible de lire le fichier source", e);
		 }
		 return content;
	 }
	 
	 /**
	  * Creation de repertoire
	  * @param directory
	  * @throws BusinessException
	  */
	 public static void createDirectory(String directory) throws BusinessException {
		 boolean status=false;
		 try {
	         File file = new File(directory);
	         status = file.exists();
	         if (!status) {
	        	 status = file.mkdirs();
	         }
		 }
		 catch (Exception e) {
			 throw new BusinessException("createDirectory", "Impossible de creer le repertoire cible", e);
		 }
		 
         if (!status) 
        	 throw new BusinessException("createDirectory", "Repertoire : " + directory + " impossible a creer", new Exception("Repertoire : " + directory + " impossible a creer"));
	 }
	 
	 /**
	  * lecture d'un repertoire
	  * @param path
	  * @param filter
	  * @return
	  */
	 public static List<String> listDirectory(String path,String filter)
	 { 
		List<String> listFile = new ArrayList<String>();
		File file = new File(path ); 
		String [] arrayFile=file.list();
		
		
		//read directory
		if (arrayFile != null) {
			for (int index=0; index<arrayFile.length;index++) 
			{ 
				if ( arrayFile[index]!= null && (arrayFile[index].matches(filter)))
				{ 
					if (!path.endsWith("/")){
						listFile.add(path+"/"+arrayFile[index]);
					} else {
						listFile.add(path+arrayFile[index]);
					}
				} 
			} 
		}
		return listFile;
	 }	 
}