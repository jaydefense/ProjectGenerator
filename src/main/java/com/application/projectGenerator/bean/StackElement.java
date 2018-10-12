
package com.application.projectGenerator.bean;

import java.util.List;
import javax.validation.Valid;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.apache.commons.lang3.builder.ToStringBuilder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
    "condition",
    "path",
    "templates"
})
public class StackElement {

    @JsonProperty("condition")
    private String condition;
    @JsonProperty("path")
    private String path;
    @JsonProperty("templates")
    @Valid
    private List<Template> templates = null;

    /**
     * No args constructor for use in serialization
     * 
     */
    public StackElement() {
    }

    /**
     * 
     * @param templates
     * @param condition
     * @param path
     */
    public StackElement(String condition, String path, List<Template> templates) {
        super();
        this.condition = condition;
        this.path = path;
        this.templates = templates;
    }

    @JsonProperty("condition")
    public String getCondition() {
        return condition;
    }

    @JsonProperty("condition")
    public void setCondition(String condition) {
        this.condition = condition;
    }

    @JsonProperty("path")
    public String getPath() {
        return path;
    }

    @JsonProperty("path")
    public void setPath(String path) {
        this.path = path;
    }

    @JsonProperty("templates")
    public List<Template> getTemplates() {
        return templates;
    }

    @JsonProperty("templates")
    public void setTemplates(List<Template> templates) {
        this.templates = templates;
    }

    @Override
    public String toString() {
        return new ToStringBuilder(this).append("condition", condition).append("path", path).append("templates", templates).toString();
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder().append(templates).append(condition).append(path).toHashCode();
    }

    @Override
    public boolean equals(Object other) {
        if (other == this) {
            return true;
        }
        if ((other instanceof StackElement) == false) {
            return false;
        }
        StackElement rhs = ((StackElement) other);
        return new EqualsBuilder().append(templates, rhs.templates).append(condition, rhs.condition).append(path, rhs.path).isEquals();
    }

}
