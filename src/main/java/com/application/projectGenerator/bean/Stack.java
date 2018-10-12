
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
    "stackElement"
})
public class Stack {

    @JsonProperty("stackElement")
    @Valid
    private List<StackElement> stackElement = null;

    /**
     * No args constructor for use in serialization
     * 
     */
    public Stack() {
    }

    /**
     * 
     * @param stackElement
     */
    public Stack(List<StackElement> stackElement) {
        super();
        this.stackElement = stackElement;
    }

    @JsonProperty("stackElement")
    public List<StackElement> getStackElement() {
        return stackElement;
    }

    @JsonProperty("stackElement")
    public void setStackElement(List<StackElement> stackElement) {
        this.stackElement = stackElement;
    }

    @Override
    public String toString() {
        return new ToStringBuilder(this).append("stackElement", stackElement).toString();
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder().append(stackElement).toHashCode();
    }

    @Override
    public boolean equals(Object other) {
        if (other == this) {
            return true;
        }
        if ((other instanceof Stack) == false) {
            return false;
        }
        Stack rhs = ((Stack) other);
        return new EqualsBuilder().append(stackElement, rhs.stackElement).isEquals();
    }

}
