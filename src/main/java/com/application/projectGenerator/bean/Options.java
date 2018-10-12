
package com.application.projectGenerator.bean;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.apache.commons.lang3.builder.ToStringBuilder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
    "interpolate"
})
public class Options {

    @JsonProperty("interpolate")
    private String interpolate;

    /**
     * No args constructor for use in serialization
     * 
     */
    public Options() {
    }

    /**
     * 
     * @param interpolate
     */
    public Options(String interpolate) {
        super();
        this.interpolate = interpolate;
    }

    @JsonProperty("interpolate")
    public String getInterpolate() {
        return interpolate;
    }

    @JsonProperty("interpolate")
    public void setInterpolate(String interpolate) {
        this.interpolate = interpolate;
    }

    @Override
    public String toString() {
        return new ToStringBuilder(this).append("interpolate", interpolate).toString();
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder().append(interpolate).toHashCode();
    }

    @Override
    public boolean equals(Object other) {
        if (other == this) {
            return true;
        }
        if ((other instanceof Options) == false) {
            return false;
        }
        Options rhs = ((Options) other);
        return new EqualsBuilder().append(interpolate, rhs.interpolate).isEquals();
    }

}
