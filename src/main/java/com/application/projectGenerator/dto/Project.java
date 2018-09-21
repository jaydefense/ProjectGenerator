
package com.application.projectGenerator.dto;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.Generated;
import javax.validation.Valid;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.apache.commons.lang3.builder.ToStringBuilder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Generated("org.jsonschema2pojo")
@JsonPropertyOrder({
    "projet",
    "projectPackage",
    "entities",
    "views",
    "controlleurs",
    "services",
    "repositories",
    "database"
})
public class Project {

    @JsonProperty("projet")
    private String projet;
    @JsonProperty("projectPackage")
    private String projectPackage;
    @JsonProperty("entities")
    @Valid
    private List<String> entities = new ArrayList<String>();
    @JsonProperty("views")
    @Valid
    private List<View> views = new ArrayList<View>();
    @JsonProperty("controlleurs")
    @Valid
    private List<Controlleur> controlleurs = new ArrayList<Controlleur>();
    @JsonProperty("services")
    @Valid
    private List<Service> services = new ArrayList<Service>();
    @JsonProperty("repositories")
    @Valid
    private List<Repository> repositories = new ArrayList<Repository>();
    @JsonProperty("database")
    @Valid
    private Database database;

    /**
     * No args constructor for use in serialization
     * 
     */
    public Project() {
    }

    /**
     * 
     * @param services
     * @param repositories
     * @param projectPackage
     * @param projet
     * @param views
     * @param controlleurs
     * @param entities
     * @param database
     */
    public Project(String projet, String projectPackage, List<String> entities, List<View> views, List<Controlleur> controlleurs, List<Service> services, List<Repository> repositories, Database database) {
        this.projet = projet;
        this.projectPackage = projectPackage;
        this.entities = entities;
        this.views = views;
        this.controlleurs = controlleurs;
        this.services = services;
        this.repositories = repositories;
        this.database = database;
    }

    /**
     * 
     * @return
     *     The projet
     */
    @JsonProperty("projet")
    public String getProjet() {
        return projet;
    }

    /**
     * 
     * @param projet
     *     The projet
     */
    @JsonProperty("projet")
    public void setProjet(String projet) {
        this.projet = projet;
    }

    /**
     * 
     * @return
     *     The projectPackage
     */
    @JsonProperty("projectPackage")
    public String getProjectPackage() {
        return projectPackage;
    }

    /**
     * 
     * @param projectPackage
     *     The projectPackage
     */
    @JsonProperty("projectPackage")
    public void setProjectPackage(String projectPackage) {
        this.projectPackage = projectPackage;
    }

    /**
     * 
     * @return
     *     The entities
     */
    @JsonProperty("entities")
    public List<String> getEntities() {
        return entities;
    }

    /**
     * 
     * @param entities
     *     The entities
     */
    @JsonProperty("entities")
    public void setEntities(List<String> entities) {
        this.entities = entities;
    }

    /**
     * 
     * @return
     *     The views
     */
    @JsonProperty("views")
    public List<View> getViews() {
        return views;
    }

    /**
     * 
     * @param views
     *     The views
     */
    @JsonProperty("views")
    public void setViews(List<View> views) {
        this.views = views;
    }

    /**
     * 
     * @return
     *     The controlleurs
     */
    @JsonProperty("controlleurs")
    public List<Controlleur> getControlleurs() {
        return controlleurs;
    }

    /**
     * 
     * @param controlleurs
     *     The controlleurs
     */
    @JsonProperty("controlleurs")
    public void setControlleurs(List<Controlleur> controlleurs) {
        this.controlleurs = controlleurs;
    }

    /**
     * 
     * @return
     *     The services
     */
    @JsonProperty("services")
    public List<Service> getServices() {
        return services;
    }

    /**
     * 
     * @param services
     *     The services
     */
    @JsonProperty("services")
    public void setServices(List<Service> services) {
        this.services = services;
    }

    /**
     * 
     * @return
     *     The repositories
     */
    @JsonProperty("repositories")
    public List<Repository> getRepositories() {
        return repositories;
    }

    /**
     * 
     * @param repositories
     *     The repositories
     */
    @JsonProperty("repositories")
    public void setRepositories(List<Repository> repositories) {
        this.repositories = repositories;
    }

    /**
     * 
     * @return
     *     The database
     */
    @JsonProperty("database")
    public Database getDatabase() {
        return database;
    }

    /**
     * 
     * @param database
     *     The database
     */
    @JsonProperty("database")
    public void setDatabase(Database database) {
        this.database = database;
    }

    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this);
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder().append(projet).append(projectPackage).append(entities).append(views).append(controlleurs).append(services).append(repositories).append(database).toHashCode();
    }

    @Override
    public boolean equals(Object other) {
        if (other == this) {
            return true;
        }
        if ((other instanceof Project) == false) {
            return false;
        }
        Project rhs = ((Project) other);
        return new EqualsBuilder().append(projet, rhs.projet).append(projectPackage, rhs.projectPackage).append(entities, rhs.entities).append(views, rhs.views).append(controlleurs, rhs.controlleurs).append(services, rhs.services).append(repositories, rhs.repositories).append(database, rhs.database).isEquals();
    }

}
