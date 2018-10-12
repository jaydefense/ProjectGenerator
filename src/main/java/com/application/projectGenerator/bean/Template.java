
package com.application.projectGenerator.bean;

import javax.validation.Valid;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.apache.commons.lang3.builder.ToStringBuilder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
        "file",
        "method",
        "noEjs",
        "renameTo",
        "options"
})
public class Template {

    @JsonProperty("file")
    private String file;
    @JsonProperty("method")
    private String method;
    @JsonProperty("noEjs")
    private boolean noEjs;
    @JsonProperty("renameTo")
    private String renameTo;
    @JsonProperty("options")
    @Valid
    private Options options;

    /**
     * No args constructor for use in serialization
     *
     */
    public Template() {
    }

    /**
     *
     * @param renameTo
     * @param file
     * @param method
     * @param noEjs
     * @param options
     */
    public Template(String file, String method, boolean noEjs, String renameTo, Options options) {
        super();
        this.file = file;
        this.method = method;
        this.noEjs = noEjs;
        this.renameTo = renameTo;
        this.options = options;
    }

    @JsonProperty("file")
    public String getFile() {
        return file;
    }

    @JsonProperty("file")
    public void setFile(String file) {
        this.file = file;
    }

    @JsonProperty("method")
    public String getMethod() {
        return method;
    }

    @JsonProperty("method")
    public void setMethod(String method) {
        this.method = method;
    }

    @JsonProperty("noEjs")
    public boolean isNoEjs() {
        return noEjs;
    }

    @JsonProperty("noEjs")
    public void setNoEjs(boolean noEjs) {
        this.noEjs = noEjs;
    }

    @JsonProperty("renameTo")
    public String getRenameTo() {
        return renameTo;
    }

    @JsonProperty("renameTo")
    public void setRenameTo(String renameTo) {
        this.renameTo = renameTo;
    }

    @JsonProperty("options")
    public Options getOptions() {
        return options;
    }

    @JsonProperty("options")
    public void setOptions(Options options) {
        this.options = options;
    }

    @Override
    public String toString() {
        return new ToStringBuilder(this).append("file", file).append("method", method).append("noEjs", noEjs).append("renameTo", renameTo).append("options", options).toString();
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder().append(renameTo).append(file).append(method).append(noEjs).append(options).toHashCode();
    }

    @Override
    public boolean equals(Object other) {
        if (other == this) {
            return true;
        }
        if ((other instanceof Template) == false) {
            return false;
        }
        Template rhs = ((Template) other);
        return new EqualsBuilder().append(renameTo, rhs.renameTo).append(file, rhs.file).append(method, rhs.method).append(noEjs, rhs.noEjs).append(options, rhs.options).isEquals();
    }

}