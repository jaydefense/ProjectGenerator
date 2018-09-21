
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
    "methodes"
})
public class Service {

    @JsonProperty("name")
    private String name;
    @JsonProperty("methodes")
    @Valid
    private List<String> methodes = new ArrayList<String>();

    /**
     * No args constructor for use in serialization
     * 
     */
    public Service() {
    }

    /**
     * 
     * @param name
     * @param methodes
     */
    public Service(String name, List<String> methodes) {
        this.name = name;
        this.methodes = methodes;
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
     *     The methodes
     */
    @JsonProperty("methodes")
    public List<String> getMethodes() {
        return methodes;
    }

    /**
     * 
     * @param methodes
     *     The methodes
     */
    @JsonProperty("methodes")
    public void setMethodes(List<String> methodes) {
        this.methodes = methodes;
    }

    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this);
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder().append(name).append(methodes).toHashCode();
    }

    @Override
    public boolean equals(Object other) {
        if (other == this) {
            return true;
        }
        if ((other instanceof Service) == false) {
            return false;
        }
        Service rhs = ((Service) other);
        return new EqualsBuilder().append(name, rhs.name).append(methodes, rhs.methodes).isEquals();
    }

}
