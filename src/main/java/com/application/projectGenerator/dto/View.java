
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
    "name",
    "viewController",
    "viewModel",
    "action",
    "viewProperties"
})
public class View {

    @JsonProperty("name")
    private String name;
    @JsonProperty("viewController")
    private String viewController;
    @JsonProperty("viewModel")
    private String viewModel;
    @JsonProperty("action")
    @Valid
    private List<String> action = new ArrayList<String>();
    @JsonProperty("viewProperties")
    @Valid
    private List<ViewProperty> viewProperties = new ArrayList<ViewProperty>();

    /**
     * No args constructor for use in serialization
     * 
     */
    public View() {
    }

    /**
     * 
     * @param viewModel
     * @param name
     * @param action
     * @param viewProperties
     * @param viewController
     */
    public View(String name, String viewController, String viewModel, List<String> action, List<ViewProperty> viewProperties) {
        this.name = name;
        this.viewController = viewController;
        this.viewModel = viewModel;
        this.action = action;
        this.viewProperties = viewProperties;
    }

    /**
     * 
     * @return
     *     The name
     */
    @JsonProperty("name")
    public String getName() {
        return name;
    }

    /**
     * 
     * @param name
     *     The name
     */
    @JsonProperty("name")
    public void setName(String name) {
        this.name = name;
    }

    /**
     * 
     * @return
     *     The viewController
     */
    @JsonProperty("viewController")
    public String getViewController() {
        return viewController;
    }

    /**
     * 
     * @param viewController
     *     The viewController
     */
    @JsonProperty("viewController")
    public void setViewController(String viewController) {
        this.viewController = viewController;
    }

    /**
     * 
     * @return
     *     The viewModel
     */
    @JsonProperty("viewModel")
    public String getViewModel() {
        return viewModel;
    }

    /**
     * 
     * @param viewModel
     *     The viewModel
     */
    @JsonProperty("viewModel")
    public void setViewModel(String viewModel) {
        this.viewModel = viewModel;
    }

    /**
     * 
     * @return
     *     The action
     */
    @JsonProperty("action")
    public List<String> getAction() {
        return action;
    }

    /**
     * 
     * @param action
     *     The action
     */
    @JsonProperty("action")
    public void setAction(List<String> action) {
        this.action = action;
    }

    /**
     * 
     * @return
     *     The viewProperties
     */
    @JsonProperty("viewProperties")
    public List<ViewProperty> getViewProperties() {
        return viewProperties;
    }

    /**
     * 
     * @param viewProperties
     *     The viewProperties
     */
    @JsonProperty("viewProperties")
    public void setViewProperties(List<ViewProperty> viewProperties) {
        this.viewProperties = viewProperties;
    }

    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this);
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder().append(name).append(viewController).append(viewModel).append(action).append(viewProperties).toHashCode();
    }

    @Override
    public boolean equals(Object other) {
        if (other == this) {
            return true;
        }
        if ((other instanceof View) == false) {
            return false;
        }
        View rhs = ((View) other);
        return new EqualsBuilder().append(name, rhs.name).append(viewController, rhs.viewController).append(viewModel, rhs.viewModel).append(action, rhs.action).append(viewProperties, rhs.viewProperties).isEquals();
    }

}
