
package com.application.projectGenerator.dto;

import javax.annotation.Generated;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.apache.commons.lang3.builder.ToStringBuilder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Generated("org.jsonschema2pojo")
@JsonPropertyOrder({
    "type",
    "host",
    "port",
    "lgoin",
    "password",
    "hibernateCache"
})
public class Database {

    @JsonProperty("type")
    private String type;
    @JsonProperty("host")
    private String host;
    @JsonProperty("port")
    private String port;
    @JsonProperty("lgoin")
    private String lgoin;
    @JsonProperty("password")
    private String password;
    @JsonProperty("hibernateCache")
    private String hibernateCache;

    /**
     * No args constructor for use in serialization
     * 
     */
    public Database() {
    }

    /**
     * 
     * @param port
     * @param hibernateCache
     * @param host
     * @param type
     * @param password
     * @param lgoin
     */
    public Database(String type, String host, String port, String lgoin, String password, String hibernateCache) {
        this.type = type;
        this.host = host;
        this.port = port;
        this.lgoin = lgoin;
        this.password = password;
        this.hibernateCache = hibernateCache;
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
     *     The host
     */
    @JsonProperty("host")
    public String getHost() {
        return host;
    }

    /**
     * 
     * @param host
     *     The host
     */
    @JsonProperty("host")
    public void setHost(String host) {
        this.host = host;
    }

    /**
     * 
     * @return
     *     The port
     */
    @JsonProperty("port")
    public String getPort() {
        return port;
    }

    /**
     * 
     * @param port
     *     The port
     */
    @JsonProperty("port")
    public void setPort(String port) {
        this.port = port;
    }

    /**
     * 
     * @return
     *     The lgoin
     */
    @JsonProperty("lgoin")
    public String getLgoin() {
        return lgoin;
    }

    /**
     * 
     * @param lgoin
     *     The lgoin
     */
    @JsonProperty("lgoin")
    public void setLgoin(String lgoin) {
        this.lgoin = lgoin;
    }

    /**
     * 
     * @return
     *     The password
     */
    @JsonProperty("password")
    public String getPassword() {
        return password;
    }

    /**
     * 
     * @param password
     *     The password
     */
    @JsonProperty("password")
    public void setPassword(String password) {
        this.password = password;
    }

    /**
     * 
     * @return
     *     The hibernateCache
     */
    @JsonProperty("hibernateCache")
    public String getHibernateCache() {
        return hibernateCache;
    }

    /**
     * 
     * @param hibernateCache
     *     The hibernateCache
     */
    @JsonProperty("hibernateCache")
    public void setHibernateCache(String hibernateCache) {
        this.hibernateCache = hibernateCache;
    }

    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this);
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder().append(type).append(host).append(port).append(lgoin).append(password).append(hibernateCache).toHashCode();
    }

    @Override
    public boolean equals(Object other) {
        if (other == this) {
            return true;
        }
        if ((other instanceof Database) == false) {
            return false;
        }
        Database rhs = ((Database) other);
        return new EqualsBuilder().append(type, rhs.type).append(host, rhs.host).append(port, rhs.port).append(lgoin, rhs.lgoin).append(password, rhs.password).append(hibernateCache, rhs.hibernateCache).isEquals();
    }

}
