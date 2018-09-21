
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
    "title",
    "template",
    "extended",
    "type",
    "fields"
})
public class ViewProperty {

    @JsonProperty("title")
    private String title;
    @JsonProperty("template")
    private String template;
    @JsonProperty("extended")
    private String extended;
    @JsonProperty("type")
    private String type;
    @JsonProperty("fields")
    @Valid
    private List<String> fields = new ArrayList<String>();

    /**
     * No args constructor for use in serialization
     * 
     */
    public ViewProperty() {
    }

    /**
     * 
     * @param template
     * @param title
     * @param extended
     * @param type
     * @param fields
     */
    public ViewProperty(String title, String template, String extended, String type, List<String> fields) {
        this.title = title;
        this.template = template;
        this.extended = extended;
        this.type = type;
        this.fields = fields;
    }

    /**
     * 
     * @return
     *     The title
     */
    @JsonProperty("title")
    public String getTitle() {
        return title;
    }

    /**
     * 
     * @param title
     *     The title
     */
    @JsonProperty("title")
    public void setTitle(String title) {
        this.title = title;
    }

    /**
     * 
     * @return
     *     The template
     */
    @JsonProperty("template")
    public String getTemplate() {
        return template;
    }

    /**
     * 
     * @param template
     *     The template
     */
    @JsonProperty("template")
    public void setTemplate(String template) {
        this.template = template;
    }

    /**
     * 
     * @return
     *     The extended
     */
    @JsonProperty("extended")
    public String getExtended() {
        return extended;
    }

    /**
     * 
     * @param extended
     *     The extended
     */
    @JsonProperty("extended")
    public void setExtended(String extended) {
        this.extended = extended;
    }

    /**
     * 
     * @return
     *     The type
     */
    @JsonProperty("type")
    public String getType() {
        return type;
    }

    /**
     * 
     * @param type
     *     The type
     */
    @JsonProperty("type")
    public void setType(String type) {
        this.type = type;
    }

    /**
     * 
     * @return
     *     The fields
     */
    @JsonProperty("fields")
    public List<String> getFields() {
        return fields;
    }

    /**
     * 
     * @param fields
     *     The fields
     */
    @JsonProperty("fields")
    public void setFields(List<String> fields) {
        this.fields = fields;
    }

    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this);
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder().append(title).append(template).append(extended).append(type).append(fields).toHashCode();
    }

    @Override
    public boolean equals(Object other) {
        if (other == this) {
            return true;
        }
        if ((other instanceof ViewProperty) == false) {
            return false;
        }
        ViewProperty rhs = ((ViewProperty) other);
        return new EqualsBuilder().append(title, rhs.title).append(template, rhs.template).append(extended, rhs.extended).append(type, rhs.type).append(fields, rhs.fields).isEquals();
    }

}
