/**
 * Copyright 2013-2018 the original author or authors from the JHipster project.
 *
 * This file is part of the JHipster project, see https://www.jhipster.tech/
 * for more information.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/*
var mkdirp = require('mkdirp');
var cleanup = require('../cleanup');
var constants = require('../generator-constants');
*/
/* Constants use throughout */
var INTERPOLATE_REGEX = constants.INTERPOLATE_REGEX;
var DOCKER_DIR = constants.DOCKER_DIR;
var TEST_DIR = constants.TEST_DIR;
var SERVER_MAIN_SRC_DIR = constants.SERVER_MAIN_SRC_DIR;
var SERVER_MAIN_RES_DIR = constants.SERVER_MAIN_RES_DIR;
var SERVER_TEST_SRC_DIR = constants.SERVER_TEST_SRC_DIR;
var SERVER_TEST_RES_DIR = constants.SERVER_TEST_RES_DIR;

var shouldSkipUserManagement =    " generator.skipUserManagement && (generator.applicationType !== 'monolith' || generator.authenticationType !== 'oauth2')";
/**
 * The default is to use a file path string. It implies use of the template method.
 * For any other config an object { file:.., method:.., template:.. } can be used
 */
var serverFiles = {
    global: [
        {
            templates: [
                'README.md',
                {
                    file: 'gitignore',
                    renameTo: '.gitignore'
                },
                {
                    file: 'gitattributes',
                    renameTo:  '.gitattributes',
                    method: 'copy'
                },
                {
                    file: 'editorconfig',
                    renameTo:  '.editorconfig',
                    method: 'copy'
                }
            ]
        }
    ],
    jib: [
        {
            path: 'src/main/jib/',
            templates: ['entrypoint.sh']
        }
    ],
    serverBuild: [
        {
            condition: "generator.buildTool === 'gradle'",
            templates: [
                'build.gradle',
                'settings.gradle',
                'gradle.properties',
                'gradle/sonar.gradle',
                'gradle/docker.gradle',
                { file: 'gradle/profile_dev.gradle', options: { interpolate: INTERPOLATE_REGEX } },
                { file: 'gradle/profile_prod.gradle', options: { interpolate: INTERPOLATE_REGEX } },
                'gradle/zipkin.gradle',
                { file: 'gradlew', method: 'copy', noEjs: true },
                { file: 'gradlew.bat', method: 'copy', noEjs: true },
                { file: 'gradle/wrapper/gradle-wrapper.jar', method: 'copy', noEjs: true },
                { file: 'gradle/wrapper/gradle-wrapper.properties', method: 'copy', noEjs: true }
            ]
        },
        {
            condition:  "generator.buildTool === 'gradle' && !!generator.enableSwaggerCodegen",
            templates: ['gradle/swagger.gradle']
        },
        {
            condition: "generator.buildTool === 'maven'",
            templates: [
                { file: 'mvnw', method: 'copy', noEjs: true },
                { file: 'mvnw.cmd', method: 'copy', noEjs: true },
                { file: '.mvn/wrapper/maven-wrapper.jar', method: 'copy', noEjs: true },
                { file: '.mvn/wrapper/maven-wrapper.properties', method: 'copy', noEjs: true },
                { file: '.mvn/wrapper/MavenWrapperDownloader.java', method: 'copy', noEjs: true },
                { file: 'pom.xml', options: { interpolate: INTERPOLATE_REGEX } }
            ]
        }
    ],
    serverResource: [
        {
            condition: "generator.clientFramework === 'react'",
            path: SERVER_MAIN_RES_DIR,
            templates: [
                {
                    file: 'banner-react.txt',
                    method: 'copy',
                    noEjs: true,
                    renameTo: 'banner.txt'
                }
            ]
        },
        {
            condition: "generator.clientFramework !== 'react'",
            path: SERVER_MAIN_RES_DIR,
            templates: [{ file: 'banner.txt', method: 'copy', noEjs: true }]
        },
        {
            condition: "generator.devDatabaseType === 'h2Disk' || generator.devDatabaseType === 'h2Memory'",
            path: SERVER_MAIN_RES_DIR,
            templates: [{ file: 'h2.server.properties', renameTo:  '.h2.server.properties' }]
        },
        {
            condition: "!!generator.enableSwaggerCodegen",
            path: SERVER_MAIN_RES_DIR,
            templates: ['swagger/api.yml']
        },
        {
            path: SERVER_MAIN_RES_DIR,
            templates: [
                // Thymeleaf templates
                { file: 'templates/error.html', method: 'copy' },
                'logback-spring.xml',
                'config/application.yml',
                'config/application-dev.yml',
                'config/application-tls.yml',
                'config/application-prod.yml',
                'i18n/messages.properties'
            ]
        },
        {
            condition: "generator.databaseType === 'sql'",
            path: SERVER_MAIN_RES_DIR,
            templates: [
                {
                    file: 'config/liquibase/changelog/initial_schema.xml',
                    renameTo:     'config/liquibase/changelog/00000000000000_initial_schema.xml',
                    options: { interpolate: INTERPOLATE_REGEX }
                },
                { file: 'config/liquibase/master.xml', method: 'copy' }
            ]
        },
        {
            condition: "generator.databaseType === 'mongodb'",
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                {
                    file: 'package/config/dbmigrations/package-info.java',
                    renameTo: "${generator.javaDir}config/dbmigrations/package-info.java"
                }
            ]
        },
        {
            condition: 
                generator.databaseType === 'mongodb' &&
                (!generator.skipUserManagement || (generator.skipUserManagement && generator.authenticationType === 'oauth2')),
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                {
                    file: 'package/config/dbmigrations/InitialSetupMigration.java',
                    renameTo: "${generator.javaDir}config/dbmigrations/InitialSetupMigration.java"
                }
            ]
        },
        {
            condition: "generator.databaseType === 'couchbase'",
            path: SERVER_MAIN_RES_DIR,
            templates: ['config/couchmove/changelog/V0__create_indexes.n1ql']
        },
        {
            condition: 
                generator.databaseType === 'couchbase' && (!generator.skipUserManagement || generator.authenticationType === 'oauth2'),
            path: SERVER_MAIN_RES_DIR,
            templates: [
                'config/couchmove/changelog/V0.1__initial_setup/ROLE_ADMIN.json',
                'config/couchmove/changelog/V0.1__initial_setup/ROLE_USER.json',
                'config/couchmove/changelog/V0.1__initial_setup/user__admin.json',
                'config/couchmove/changelog/V0.1__initial_setup/user__anonymoususer.json',
                'config/couchmove/changelog/V0.1__initial_setup/user__system.json',
                'config/couchmove/changelog/V0.1__initial_setup/user__user.json'
            ]
        },
        {
            condition: "generator.databaseType === 'cassandra'",
            path: SERVER_MAIN_RES_DIR,
            templates: [
                'config/cql/create-keyspace-prod.cql',
                'config/cql/create-keyspace.cql',
                'config/cql/drop-keyspace.cql',
                { file: 'config/cql/changelog/README.md', method: 'copy' }
            ]
        },
        {
            condition:                 generator.databaseType === 'cassandra' &&
                generator.applicationType !== 'microservice' &&
                (!generator.skipUserManagement || generator.authenticationType === 'oauth2'),
            path: SERVER_MAIN_RES_DIR,
            templates: [
                { file: 'config/cql/changelog/create-tables.cql', renameTo:     'config/cql/changelog/00000000000000_create-tables.cql' },
                {
                    file: 'config/cql/changelog/insert_default_users.cql',
                    renameTo:     'config/cql/changelog/00000000000001_insert_default_users.cql'
                }
            ]
        }
    ],
    serverJavaAuthConfig: [
        {
            condition:                 generator.databaseType === 'sql' || generator.databaseType === 'mongodb' || generator.databaseType === 'couchbase',
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                {
                    file: 'package/security/SpringSecurityAuditorAware.java',
                    renameTo: "${generator.javaDir}security/SpringSecurityAuditorAware.java"
                }
            ]
        },
        {
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                {
                    file: 'package/security/SecurityUtils.java',
                    renameTo:    "${generator.javaDir}security/SecurityUtils.java"
                },
                {
                    file: 'package/security/AuthoritiesConstants.java',
                    renameTo:    "${generator.javaDir}security/AuthoritiesConstants.java"
                },
                {
                    file: 'package/security/package-info.java',
                    renameTo:    "${generator.javaDir}security/package-info.java"
                }
            ]
        },
        {
            condition: "generator.authenticationType === 'jwt'",
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                {
                    file: 'package/security/jwt/TokenProvider.java',
                    renameTo:    "${generator.javaDir}security/jwt/TokenProvider.java"
                },
                {
                    file: 'package/security/jwt/JWTFilter.java',
                    renameTo:    "${generator.javaDir}security/jwt/JWTFilter.java"
                }
            ]
        },
        {
            condition: "generator.authenticationType === 'jwt' && !generator.reactive",
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                {
                    file: 'package/security/jwt/JWTConfigurer.java',
                    renameTo:    "${generator.javaDir}security/jwt/JWTConfigurer.java"
                }
            ]
        },
        {
            condition:                 !generator.reactive &&
                (generator.applicationType === 'microservice' ||
                    (generator.applicationType !== 'uaa' &&
                        ((shouldSkipUserManagement(generator) && generator.authenticationType === 'jwt') ||
                            !shouldSkipUserManagement(generator) ||
                            generator.authenticationType === 'uaa'))),
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                {
                    file: 'package/config/SecurityConfiguration.java',
                    renameTo:    "${generator.javaDir}config/SecurityConfiguration.java"
                }
            ]
        },
        {
            condition:                 generator.reactive &&
                (generator.applicationType === 'microservice' ||
                    (generator.applicationType !== 'uaa' &&
                        ((shouldSkipUserManagement(generator) && generator.authenticationType === 'jwt') ||
                            !shouldSkipUserManagement(generator) ||
                            generator.authenticationType === 'uaa'))),
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                {
                    file: 'package/config/ReactiveSecurityConfiguration.java',
                    renameTo:    "${generator.javaDir}config/SecurityConfiguration.java"
                }
            ]
        },
        {
            condition: "!shouldSkipUserManagement(generator) && generator.applicationType === 'uaa'",
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                {
                    file: 'package/config/UaaWebSecurityConfiguration.java',
                    renameTo:    "${generator.javaDir}config/UaaWebSecurityConfiguration.java"
                },
                {
                    file: 'package/config/UaaConfiguration.java',
                    renameTo:    "${generator.javaDir}config/UaaConfiguration.java"
                },
                {
                    file: 'package/config/UaaProperties.java',
                    renameTo:    "${generator.javaDir}config/UaaProperties.java"
                },
                {
                    file: 'package/security/IatTokenEnhancer.java',
                    renameTo:    "${generator.javaDir}security/IatTokenEnhancer.java"
                }
            ]
        },
        {
            condition: "!shouldSkipUserManagement(generator) && generator.authenticationType === 'session'",
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                {
                    file: 'package/security/PersistentTokenRememberMeServices.java',
                    renameTo:    "${generator.javaDir}security/PersistentTokenRememberMeServices.java"
                },
                {
                    file: 'package/domain/PersistentToken.java',
                    renameTo:    "${generator.javaDir}domain/PersistentToken.java"
                },
                {
                    file: 'package/repository/PersistentTokenRepository.java',
                    renameTo:    "${generator.javaDir}repository/PersistentTokenRepository.java"
                }
            ]
        },
        {
            condition: "!shouldSkipUserManagement(generator) && generator.authenticationType === 'oauth2'",
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                {
                    file: 'package/config/OAuth2Configuration.java',
                    renameTo:    "${generator.javaDir}config/OAuth2Configuration.java"
                },
                {
                    file: 'package/security/OAuth2AuthenticationSuccessHandler.java',
                    renameTo:    "${generator.javaDir}security/OAuth2AuthenticationSuccessHandler.java"
                }
            ]
        },
        {
            condition: "!shouldSkipUserManagement(generator) && generator.authenticationType !== 'oauth2'",
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                {
                    file: 'package/security/DomainUserDetailsService.java',
                    renameTo:    "${generator.javaDir}security/DomainUserDetailsService.java"
                },
                {
                    file: 'package/security/UserNotActivatedException.java',
                    renameTo:    "${generator.javaDir}security/UserNotActivatedException.java"
                }
            ]
        },
        {
            condition: "!shouldSkipUserManagement(generator) && generator.authenticationType === 'jwt'",
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                {
                    file: 'package/web/rest/vm/LoginVM.java',
                    renameTo:    "${generator.javaDir}web/rest/vm/LoginVM.java"
                },
                {
                    file: 'package/web/rest/UserJWTController.java',
                    renameTo:    "${generator.javaDir}web/rest/UserJWTController.java"
                }
            ]
        }
    ],
    serverJavaGateway: [
        {
            condition: "generator.applicationType === 'gateway' && generator.serviceDiscoveryType",
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                {
                    file: 'package/config/GatewayConfiguration.java',
                    renameTo:    "${generator.javaDir}config/GatewayConfiguration.java"
                },
                {
                    file: 'package/config/apidoc/GatewaySwaggerResourcesProvider.java',
                    renameTo:    "${generator.javaDir}config/apidoc/GatewaySwaggerResourcesProvider.java"
                },
                {
                    file: 'package/gateway/ratelimiting/RateLimitingFilter.java',
                    renameTo:    "${generator.javaDir}gateway/ratelimiting/RateLimitingFilter.java"
                },
                {
                    file: 'package/gateway/accesscontrol/AccessControlFilter.java',
                    renameTo:    "${generator.javaDir}gateway/accesscontrol/AccessControlFilter.java"
                },
                {
                    file: 'package/gateway/responserewriting/SwaggerBasePathRewritingFilter.java',
                    renameTo:    "${generator.javaDir}gateway/responserewriting/SwaggerBasePathRewritingFilter.java"
                },
                { file: 'package/web/rest/vm/RouteVM.java', renameTo:    "${generator.javaDir}web/rest/vm/RouteVM.java" },
                {
                    file: 'package/web/rest/GatewayResource.java',
                    renameTo:    "${generator.javaDir}web/rest/GatewayResource.java"
                }
            ]
        },
        {
            condition:                 generator.applicationType === 'gateway' && generator.authenticationType === 'jwt' && generator.serviceDiscoveryType,
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                {
                    file: 'package/gateway/TokenRelayFilter.java',
                    renameTo:    "${generator.javaDir}gateway/TokenRelayFilter.java"
                }
            ]
        },
        {
            condition: "generator.applicationType === 'gateway' && generator.authenticationType === 'uaa'",
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                { file: 'package/web/rest/AuthResource.java', renameTo:    "${generator.javaDir}web/rest/AuthResource.java" },
                {
                    file: 'package/web/filter/RefreshTokenFilter.java',
                    renameTo:    "${generator.javaDir}web/filter/RefreshTokenFilter.java"
                },
                {
                    file: 'package/web/filter/RefreshTokenFilterConfigurer.java',
                    renameTo:    "${generator.javaDir}web/filter/RefreshTokenFilterConfigurer.java"
                },
                {
                    file: 'package/config/oauth2/OAuth2AuthenticationConfiguration.java',
                    renameTo:    "${generator.javaDir}config/oauth2/OAuth2AuthenticationConfiguration.java"
                },
                {
                    file: 'package/security/oauth2/CookieCollection.java',
                    renameTo:    "${generator.javaDir}security/oauth2/CookieCollection.java"
                },
                {
                    file: 'package/security/oauth2/CookiesHttpServletRequestWrapper.java',
                    renameTo:    "${generator.javaDir}security/oauth2/CookiesHttpServletRequestWrapper.java"
                },
                {
                    file: 'package/security/oauth2/CookieTokenExtractor.java',
                    renameTo:    "${generator.javaDir}security/oauth2/CookieTokenExtractor.java"
                },
                {
                    file: 'package/security/oauth2/OAuth2AuthenticationService.java',
                    renameTo:    "${generator.javaDir}security/oauth2/OAuth2AuthenticationService.java"
                },
                {
                    file: 'package/security/oauth2/OAuth2CookieHelper.java',
                    renameTo:    "${generator.javaDir}security/oauth2/OAuth2CookieHelper.java"
                },
                {
                    file: 'package/security/oauth2/OAuth2Cookies.java',
                    renameTo:    "${generator.javaDir}security/oauth2/OAuth2Cookies.java"
                },
                {
                    file: 'package/security/oauth2/OAuth2TokenEndpointClient.java',
                    renameTo:    "${generator.javaDir}security/oauth2/OAuth2TokenEndpointClient.java"
                },
                {
                    file: 'package/security/oauth2/OAuth2TokenEndpointClientAdapter.java',
                    renameTo:    "${generator.javaDir}security/oauth2/OAuth2TokenEndpointClientAdapter.java"
                },
                {
                    file: 'package/security/oauth2/UaaTokenEndpointClient.java',
                    renameTo:    "${generator.javaDir}security/oauth2/UaaTokenEndpointClient.java"
                }
            ]
        },
        {
            condition:                 generator.applicationType === 'gateway' && generator.authenticationType === 'oauth2' && generator.serviceDiscoveryType,
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                {
                    file: 'package/config/OAuth2Configuration.java',
                    renameTo:    "${generator.javaDir}config/OAuth2Configuration.java"
                },
                {
                    file: 'package/security/OAuth2AuthenticationSuccessHandler.java',
                    renameTo:    "${generator.javaDir}security/OAuth2AuthenticationSuccessHandler.java"
                }
            ]
        }
    ],
    serverMicroservice: [
        {
            condition:                 !(
                    generator.applicationType !== 'microservice' &&
                    !(
                        generator.applicationType === 'gateway' &&
                        (generator.authenticationType === 'uaa' || generator.authenticationType === 'oauth2')
                    )
                ) && generator.authenticationType === 'uaa',
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                {
                    file: 'package/config/oauth2/OAuth2Properties.java',
                    renameTo:    "${generator.javaDir}config/oauth2/OAuth2Properties.java"
                },
                {
                    file: 'package/config/oauth2/OAuth2JwtAccessTokenConverter.java',
                    renameTo:    "${generator.javaDir}config/oauth2/OAuth2JwtAccessTokenConverter.java"
                },
                {
                    file: 'package/security/oauth2/OAuth2SignatureVerifierClient.java',
                    renameTo:    "${generator.javaDir}security/oauth2/OAuth2SignatureVerifierClient.java"
                },
                {
                    file: 'package/security/oauth2/UaaSignatureVerifierClient.java',
                    renameTo:    "${generator.javaDir}security/oauth2/UaaSignatureVerifierClient.java"
                }
            ]
        },
        {
            condition:                 !generator.reactive &&
                !(
                    generator.applicationType !== 'microservice' &&
                    !(
                        generator.applicationType === 'gateway' &&
                        (generator.authenticationType === 'uaa' || generator.authenticationType === 'oauth2')
                    )
                ) &&
                generator.applicationType === 'microservice' &&
                generator.authenticationType === 'uaa',
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                {
                    file: 'package/config/FeignConfiguration.java',
                    renameTo:    "${generator.javaDir}config/FeignConfiguration.java"
                },
                {
                    file: 'package/client/AuthorizedFeignClient.java',
                    renameTo:    "${generator.javaDir}client/AuthorizedFeignClient.java"
                },
                {
                    file: 'package/client/OAuth2InterceptedFeignConfiguration.java',
                    renameTo:    "${generator.javaDir}client/OAuth2InterceptedFeignConfiguration.java"
                },
                {
                    file: 'package/client/AuthorizedUserFeignClient.java',
                    renameTo:    "${generator.javaDir}client/AuthorizedUserFeignClient.java"
                },
                {
                    file: 'package/client/OAuth2_UserFeignClientInterceptor.java',
                    renameTo:    "${generator.javaDir}client/UserFeignClientInterceptor.java"
                },
                {
                    file: 'package/client/OAuth2UserClientFeignConfiguration.java',
                    renameTo:    "${generator.javaDir}client/OAuth2UserClientFeignConfiguration.java"
                }
            ]
        },
        {
            condition:                 !generator.reactive &&
                (generator.applicationType === 'microservice' || generator.applicationType === 'gateway') &&
                generator.authenticationType === 'jwt',
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                {
                    file: 'package/config/FeignConfiguration.java',
                    renameTo:    "${generator.javaDir}config/FeignConfiguration.java"
                },
                {
                    file: 'package/client/JWT_UserFeignClientInterceptor.java',
                    renameTo:    "${generator.javaDir}client/UserFeignClientInterceptor.java"
                }
            ]
        },
        {
            condition:                 !(
                    generator.applicationType !== 'microservice' &&
                    !(
                        generator.applicationType === 'gateway' &&
                        (generator.authenticationType === 'uaa' || generator.authenticationType === 'oauth2')
                    )
                ) && generator.authenticationType === 'oauth2',
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                {
                    file: 'package/security/oauth2/AuthorizationHeaderUtil.java',
                    renameTo:    "${generator.javaDir}security/oauth2/AuthorizationHeaderUtil.java"
                },
                {
                    file: 'package/security/oauth2/SimplePrincipalExtractor.java',
                    renameTo:    "${generator.javaDir}security/oauth2/SimplePrincipalExtractor.java"
                },
                {
                    file: 'package/security/oauth2/SimpleAuthoritiesExtractor.java',
                    renameTo:    "${generator.javaDir}security/oauth2/SimpleAuthoritiesExtractor.java"
                }
            ]
        },
        {
            condition:                 generator.applicationType === 'microservice' &&
                generator.authenticationType === 'oauth2' &&
                generator.cacheProvider !== 'no',
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                {
                    file: 'package/security/oauth2/CachedUserInfoTokenServices.java',
                    renameTo:    "${generator.javaDir}security/oauth2/CachedUserInfoTokenServices.java"
                }
            ]
        },
        {
            condition:                 generator.authenticationType === 'oauth2' &&
                (generator.applicationType === 'microservice' || generator.applicationType === 'gateway'),
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                {
                    file: 'package/config/FeignConfiguration.java',
                    renameTo:    "${generator.javaDir}config/FeignConfiguration.java"
                },
                {
                    file: 'package/client/AuthorizedFeignClient.java',
                    renameTo:    "${generator.javaDir}client/AuthorizedFeignClient.java"
                },
                {
                    file: 'package/client/OAuth2InterceptedFeignConfiguration.java',
                    renameTo:    "${generator.javaDir}client/OAuth2InterceptedFeignConfiguration.java"
                },
                {
                    file: 'package/config/OAuth2TokenServicesConfiguration.java',
                    renameTo:    "${generator.javaDir}config/OAuth2TokenServicesConfiguration.java"
                },
                {
                    file: 'package/client/TokenRelayRequestInterceptor.java',
                    renameTo:    "${generator.javaDir}client/TokenRelayRequestInterceptor.java"
                }
            ]
        },
        {
            condition:                 !(
                    generator.applicationType !== 'microservice' &&
                    !(
                        generator.applicationType === 'gateway' &&
                        (generator.authenticationType === 'uaa' || generator.authenticationType === 'oauth2')
                    )
                ) &&
                (generator.authenticationType === 'oauth2' && generator.applicationType === 'gateway'),
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                {
                    file: 'package/config/OAuth2SsoConfiguration.java',
                    renameTo:    "${generator.javaDir}config/OAuth2SsoConfiguration.java"
                }
            ]
        },
        {
            condition:                 !(
                    generator.applicationType !== 'microservice' &&
                    !(
                        generator.applicationType === 'gateway' &&
                        (generator.authenticationType === 'uaa' || generator.authenticationType === 'oauth2')
                    )
                ) && generator.applicationType === 'microservice',
            path: SERVER_MAIN_RES_DIR,
            templates: [{ file: 'static/microservices_index.html', method: 'copy', renameTo:     'static/index.html' }]
        }
    ],
    serverMicroserviceAndGateway: [
        {
            condition: "generator.serviceDiscoveryType",
            path: SERVER_MAIN_RES_DIR,
            templates: ['config/bootstrap.yml', 'config/bootstrap-prod.yml']
        }
    ],
    serverJavaApp: [
        {
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                { file: 'package/Application.java', renameTo:    "${generator.javaDir}${generator.mainClass}.java" },
                { file: 'package/ApplicationWebXml.java', renameTo:    "${generator.javaDir}ApplicationWebXml.java` "}
            ]
        }
    ],
    serverJavaConfig: [
        {
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                {
                    file: 'package/aop/logging/LoggingAspect.java',
                    renameTo:    "${generator.javaDir}aop/logging/LoggingAspect.java"
                },
                {
                    file: 'package/config/DefaultProfileUtil.java',
                    renameTo:    "${generator.javaDir}config/DefaultProfileUtil.java"
                },
                { file: 'package/config/package-info.java', renameTo:    "${generator.javaDir}config/package-info.java" },
                {
                    file: 'package/config/AsyncConfiguration.java',
                    renameTo:    "${generator.javaDir}config/AsyncConfiguration.java"
                },
                { file: 'package/config/Constants.java', renameTo:    "${generator.javaDir}config/Constants.java" },
                {
                    file: 'package/config/DateTimeFormatConfiguration.java',
                    renameTo:    "${generator.javaDir}config/DateTimeFormatConfiguration.java"
                },
                {
                    file: 'package/config/LoggingConfiguration.java',
                    renameTo:    "${generator.javaDir}config/LoggingConfiguration.java"
                },
                {
                    file: 'package/config/ApplicationProperties.java',
                    renameTo:    "${generator.javaDir}config/ApplicationProperties.java"
                },
                {
                    file: 'package/config/JacksonConfiguration.java',
                    renameTo:    "${generator.javaDir}config/JacksonConfiguration.java"
                },
                {
                    file: 'package/config/LocaleConfiguration.java',
                    renameTo:    "${generator.javaDir}config/LocaleConfiguration.java"
                },
                {
                    file: 'package/config/LoggingAspectConfiguration.java',
                    renameTo:    "${generator.javaDir}config/LoggingAspectConfiguration.java"
                },
                {
                    file: 'package/config/MetricsConfiguration.java',
                    renameTo:    "${generator.javaDir}config/MetricsConfiguration.java"
                },
                { file: 'package/config/WebConfigurer.java', renameTo:    "${generator.javaDir}config/WebConfigurer.java` "}
            ]
        },
        {
            // TODO: remove when supported by spring-data
            condition: "generator.reactive",
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                {
                    file: 'package/config/ReactivePageableHandlerMethodArgumentResolver.java',
                    renameTo:    "${generator.javaDir}config/ReactivePageableHandlerMethodArgumentResolver.java"
                },
                {
                    file: 'package/config/ReactiveSortHandlerMethodArgumentResolver.java',
                    renameTo:    "${generator.javaDir}config/ReactiveSortHandlerMethodArgumentResolver.java"
                }
            ]
        },
        {
            condition:                 ['ehcache', 'hazelcast', 'infinispan', 'memcached'].includes(generator.cacheProvider) ||
                generator.applicationType === 'gateway',
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                {
                    file: 'package/config/CacheConfiguration.java',
                    renameTo:    "${generator.javaDir}config/CacheConfiguration.java"
                }
            ]
        },
        {
            condition: "generator.cacheProvider === 'infinispan'",
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                {
                    file: 'package/config/CacheFactoryConfiguration.java',
                    renameTo:    "${generator.javaDir}config/CacheFactoryConfiguration.java"
                }
            ]
        },
        {
            condition:                 generator.databaseType === 'sql' || generator.databaseType === 'mongodb' || generator.databaseType === 'couchbase',
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                {
                    file: 'package/config/CloudDatabaseConfiguration.java',
                    renameTo:    "${generator.javaDir}config/CloudDatabaseConfiguration.java"
                },
                {
                    file: 'package/config/DatabaseConfiguration.java',
                    renameTo:    "${generator.javaDir}config/DatabaseConfiguration.java"
                },
                {
                    file: 'package/config/audit/package-info.java',
                    renameTo:    "${generator.javaDir}config/audit/package-info.java"
                },
                {
                    file: 'package/config/audit/AuditEventConverter.java',
                    renameTo:    "${generator.javaDir}config/audit/AuditEventConverter.java"
                }
            ]
        },
        {
            condition: "generator.databaseType === 'sql'",
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                {
                    file: 'package/config/LiquibaseConfiguration.java',
                    renameTo:    "${generator.javaDir}config/LiquibaseConfiguration.java"
                }
            ]
        },
        {
            condition: "generator.databaseType === 'couchbase'",
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                {
                    file: 'package/repository/N1qlCouchbaseRepository.java',
                    renameTo:    "${generator.javaDir}repository/N1qlCouchbaseRepository.java"
                },
                {
                    file: 'package/repository/CustomN1qlCouchbaseRepository.java',
                    renameTo:    "${generator.javaDir}repository/CustomN1qlCouchbaseRepository.java"
                }
            ]
        },
        {
            condition: "generator.websocket === 'spring-websocket'",
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                {
                    file: 'package/config/WebsocketConfiguration.java',
                    renameTo:    "${generator.javaDir}config/WebsocketConfiguration.java"
                },
                {
                    file: 'package/config/WebsocketSecurityConfiguration.java',
                    renameTo:    "${generator.javaDir}config/WebsocketSecurityConfiguration.java"
                }
            ]
        },
        {
            condition: "generator.databaseType === 'cassandra'",
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                {
                    file: 'package/config/metrics/package-info.java',
                    renameTo:    "${generator.javaDir}config/metrics/package-info.java"
                },
                {
                    file: 'package/config/metrics/JHipsterHealthIndicatorConfiguration.java',
                    renameTo:    "${generator.javaDir}config/metrics/JHipsterHealthIndicatorConfiguration.java"
                },
                {
                    file: 'package/config/metrics/CassandraHealthIndicator.java',
                    renameTo:    "${generator.javaDir}config/metrics/CassandraHealthIndicator.java"
                }
            ]
        },
        {
            condition: "generator.databaseType === 'cassandra'",
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                {
                    file: 'package/config/cassandra/CassandraConfiguration.java',
                    renameTo:    "${generator.javaDir}config/cassandra/CassandraConfiguration.java"
                },
                {
                    file: 'package/config/cassandra/package-info.java',
                    renameTo:    "${generator.javaDir}config/cassandra/package-info.java"
                }
            ]
        },
        {
            condition: "generator.searchEngine === 'elasticsearch'",
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                {
                    file: 'package/config/ElasticsearchConfiguration.java',
                    renameTo:    "${generator.javaDir}config/ElasticsearchConfiguration.java"
                }
            ]
        },
        {
            condition: "generator.messageBroker === 'kafka'",
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                {
                    file: 'package/config/MessagingConfiguration.java',
                    renameTo:    "${generator.javaDir}config/MessagingConfiguration.java"
                }
            ]
        }
    ],
    serverJavaDomain: [
        {
            path: SERVER_MAIN_SRC_DIR,
            templates: [{ file: 'package/domain/package-info.java', renameTo:    "${generator.javaDir}domain/package-info.java" }]
        },
        {
            condition: "['sql', 'mongodb', 'couchbase'].includes(generator.databaseType)",
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                {
                    file: 'package/domain/AbstractAuditingEntity.java',
                    renameTo:    "${generator.javaDir}domain/AbstractAuditingEntity.java"
                },
                {
                    file: 'package/domain/PersistentAuditEvent.java',
                    renameTo:    "${generator.javaDir}domain/PersistentAuditEvent.java"
                }
            ]
        }
    ],
    serverJavaPackageInfo: [
        {
            condition: "generator.searchEngine === 'elasticsearch'",
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                {
                    file: 'package/repository/search/package-info.java',
                    renameTo:    "${generator.javaDir}repository/search/package-info.java"
                }
            ]
        },
        {
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                { file: 'package/repository/package-info.java', renameTo:    "${generator.javaDir}repository/package-info.java` "}
            ]
        }
    ],
    serverJavaService: [
        {
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                { file: 'package/service/package-info.java', renameTo:    "${generator.javaDir}service/package-info.java` "}
            ]
        },
        {
            condition: "!generator.skipUserManagement",
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                { file: 'package/service/util/RandomUtil.java', renameTo:    "${generator.javaDir}service/util/RandomUtil.java` "}
            ]
        }
    ],
    serverJavaWebError: [
        {
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                {
                    file: 'package/web/rest/errors/package-info.java',
                    renameTo:    "${generator.javaDir}web/rest/errors/package-info.java"
                },
                {
                    file: 'package/web/rest/errors/InternalServerErrorException.java',
                    renameTo:    "${generator.javaDir}web/rest/errors/InternalServerErrorException.java"
                },
                {
                    file: 'package/web/rest/errors/BadRequestAlertException.java',
                    renameTo:    "${generator.javaDir}web/rest/errors/BadRequestAlertException.java"
                },
                {
                    file: 'package/web/rest/errors/CustomParameterizedException.java',
                    renameTo:    "${generator.javaDir}web/rest/errors/CustomParameterizedException.java"
                },
                {
                    file: 'package/web/rest/errors/EmailAlreadyUsedException.java',
                    renameTo:    "${generator.javaDir}web/rest/errors/EmailAlreadyUsedException.java"
                },
                {
                    file: 'package/web/rest/errors/EmailNotFoundException.java',
                    renameTo:    "${generator.javaDir}web/rest/errors/EmailNotFoundException.java"
                },
                {
                    file: 'package/web/rest/errors/ErrorConstants.java',
                    renameTo:    "${generator.javaDir}web/rest/errors/ErrorConstants.java"
                },
                {
                    file: 'package/web/rest/errors/ExceptionTranslator.java',
                    renameTo:    "${generator.javaDir}web/rest/errors/ExceptionTranslator.java"
                },
                {
                    file: 'package/web/rest/errors/FieldErrorVM.java',
                    renameTo:    "${generator.javaDir}web/rest/errors/FieldErrorVM.java"
                },
                {
                    file: 'package/web/rest/errors/InvalidPasswordException.java',
                    renameTo:    "${generator.javaDir}web/rest/errors/InvalidPasswordException.java"
                },
                {
                    file: 'package/web/rest/errors/LoginAlreadyUsedException.java',
                    renameTo:    "${generator.javaDir}web/rest/errors/LoginAlreadyUsedException.java"
                }
            ]
        }
    ],
    serverJavaWeb: [
        {
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                {
                    file: 'package/web/rest/vm/package-info.java',
                    renameTo:    "${generator.javaDir}web/rest/vm/package-info.java"
                },
                { file: 'package/web/rest/vm/LoggerVM.java', renameTo:    "${generator.javaDir}web/rest/vm/LoggerVM.java" },

                {
                    file: 'package/web/rest/util/HeaderUtil.java',
                    renameTo:    "${generator.javaDir}web/rest/util/HeaderUtil.java"
                },
                {
                    file: 'package/web/rest/util/PaginationUtil.java',
                    renameTo:    "${generator.javaDir}web/rest/util/PaginationUtil.java"
                },
                { file: 'package/web/rest/package-info.java', renameTo:    "${generator.javaDir}web/rest/package-info.java" },

                { file: 'package/web/rest/LogsResource.java', renameTo:    "${generator.javaDir}web/rest/LogsResource.java" }
            ]
        }
    ],
    serverJavaWebsocket: [
        {
            condition: "generator.websocket === 'spring-websocket'",
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                {
                    file: 'package/web/websocket/package-info.java',
                    renameTo:    "${generator.javaDir}web/websocket/package-info.java"
                },
                {
                    file: 'package/web/websocket/ActivityService.java',
                    renameTo:    "${generator.javaDir}web/websocket/ActivityService.java"
                },
                {
                    file: 'package/web/websocket/dto/package-info.java',
                    renameTo:    "${generator.javaDir}web/websocket/dto/package-info.java"
                },
                {
                    file: 'package/web/websocket/dto/ActivityDTO.java',
                    renameTo:    "${generator.javaDir}web/websocket/dto/ActivityDTO.java"
                }
            ]
        }
    ],
    serverTestFw: [
        {
            condition: "generator.databaseType === 'cassandra'",
            path: SERVER_TEST_SRC_DIR,
            templates: [
                {
                    file: 'package/CassandraKeyspaceUnitTest.java',
                    renameTo:    "${generator.testDir}CassandraKeyspaceUnitTest.java"
                },
                { file: 'package/AbstractCassandraTest.java', renameTo:    "${generator.testDir}AbstractCassandraTest.java" },
                {
                    file: 'package/config/CassandraTestConfiguration.java',
                    renameTo:    "${generator.testDir}config/CassandraTestConfiguration.java"
                }
            ]
        },
        {
            condition: "generator.databaseType === 'cassandra'",
            path: SERVER_TEST_RES_DIR,
            templates: ['cassandra-random-port.yml']
        },
        {
            condition: "generator.databaseType === 'couchbase'",
            path: SERVER_TEST_SRC_DIR,
            templates: [
                {
                    file: 'package/config/DatabaseTestConfiguration.java',
                    renameTo:    "${generator.testDir}config/DatabaseTestConfiguration.java"
                }
            ]
        },
        {
            path: SERVER_TEST_SRC_DIR,
            templates: [
                { file: 'package/web/rest/TestUtil.java', renameTo:    "${generator.testDir}web/rest/TestUtil.java" },
                {
                    file: 'package/web/rest/LogsResourceIntTest.java',
                    renameTo:    "${generator.testDir}web/rest/LogsResourceIntTest.java"
                },
                {
                    file: 'package/web/rest/errors/ExceptionTranslatorIntTest.java',
                    renameTo:    "${generator.testDir}web/rest/errors/ExceptionTranslatorIntTest.java"
                },
                {
                    file: 'package/web/rest/errors/ExceptionTranslatorTestController.java',
                    renameTo:    "${generator.testDir}web/rest/errors/ExceptionTranslatorTestController.java"
                },
                {
                    file: 'package/web/rest/util/PaginationUtilUnitTest.java',
                    renameTo:    "${generator.testDir}web/rest/util/PaginationUtilUnitTest.java"
                }
            ]
        },
        {
            path: SERVER_TEST_RES_DIR,
            templates: ['config/application.yml', 'logback.xml']
        },
        {
            // TODO : add these tests to reactive
            condition: "!generator.reactive",
            path: SERVER_TEST_SRC_DIR,
            templates: [
                {
                    file: 'package/config/WebConfigurerTest.java',
                    renameTo:    "${generator.testDir}config/WebConfigurerTest.java"
                },
                {
                    file: 'package/config/WebConfigurerTestController.java',
                    renameTo:    "${generator.testDir}config/WebConfigurerTestController.java"
                }
            ]
        },
        {
            condition: "generator.applicationType === 'gateway' && generator.serviceDiscoveryType",
            path: SERVER_TEST_SRC_DIR,
            templates: [
                // Create Gateway tests files
                {
                    file: 'package/gateway/responserewriting/SwaggerBasePathRewritingFilterTest.java',
                    renameTo:    "${generator.testDir}gateway/responserewriting/SwaggerBasePathRewritingFilterTest.java"
                }
            ]
        },
        {
            condition: "generator.serviceDiscoveryType",
            path: SERVER_TEST_RES_DIR,
            templates: ['config/bootstrap.yml']
        },
        {
            condition: "generator.authenticationType === 'uaa'",
            path: SERVER_TEST_SRC_DIR,
            templates: [
                {
                    file: 'package/security/OAuth2TokenMockUtil.java',
                    renameTo:    "${generator.testDir}security/OAuth2TokenMockUtil.java"
                },
                {
                    file: 'package/config/SecurityBeanOverrideConfiguration.java',
                    renameTo:    "${generator.testDir}config/SecurityBeanOverrideConfiguration.java"
                }
            ]
        },
        {
            condition: "generator.authenticationType === 'uaa' && generator.applicationType === 'gateway'",
            path: SERVER_TEST_SRC_DIR,
            templates: [
                {
                    file: 'package/security/oauth2/OAuth2CookieHelperTest.java',
                    renameTo:    "${generator.testDir}security/oauth2/OAuth2CookieHelperTest.java"
                },
                {
                    file: 'package/security/oauth2/OAuth2AuthenticationServiceTest.java',
                    renameTo:    "${generator.testDir}security/oauth2/OAuth2AuthenticationServiceTest.java"
                },
                {
                    file: 'package/security/oauth2/CookieTokenExtractorTest.java',
                    renameTo:    "${generator.testDir}security/oauth2/CookieTokenExtractorTest.java"
                },
                {
                    file: 'package/security/oauth2/CookieCollectionTest.java',
                    renameTo:    "${generator.testDir}security/oauth2/CookieCollectionTest.java"
                }
            ]
        },
        {
            condition: "true",
            path: TEST_DIR,
            templates: [
                // Create Gatling test files
                'gatling/conf/gatling.conf',
                'gatling/conf/logback.xml'
            ]
        },
        {
            condition: "generator.cucumberTests",
            path: SERVER_TEST_SRC_DIR,
            templates: [
                // Create Cucumber test files
                { file: 'package/cucumber/CucumberTest.java', renameTo:    "${generator.testDir}cucumber/CucumberTest.java" },
                {
                    file: 'package/cucumber/stepdefs/StepDefs.java',
                    renameTo:    "${generator.testDir}cucumber/stepdefs/StepDefs.java"
                },
                { file: '../features/gitkeep', noEjs: true }
            ]
        },
        {
            condition: "!shouldSkipUserManagement(generator) && generator.authenticationType !== 'oauth2'",
            path: SERVER_TEST_SRC_DIR,
            templates: [
                // Create auth config test files
                {
                    file: 'package/security/DomainUserDetailsServiceIntTest.java',
                    renameTo:    "${generator.testDir}security/DomainUserDetailsServiceIntTest.java"
                }
            ]
        }
    ],
    serverJavaUserManagement: [
        {
            condition:                 (generator.skipUserManagement &&
                    generator.authenticationType === 'oauth2' &&
                    generator.applicationType !== 'microservice') ||
                (!generator.skipUserManagement && generator.databaseType === 'sql'),
            path: SERVER_MAIN_RES_DIR,
            templates: ['config/liquibase/users.csv']
        },
        {
            condition:                 (generator.skipUserManagement &&
                    generator.authenticationType === 'oauth2' &&
                    generator.applicationType !== 'microservice' &&
                    generator.databaseType === 'sql') ||
                (!generator.skipUserManagement && generator.databaseType === 'sql'),
            path: SERVER_MAIN_RES_DIR,
            templates: ['config/liquibase/authorities.csv', 'config/liquibase/users_authorities.csv']
        },
        {
            condition: "generator.skipUserManagement && generator.authenticationType === 'oauth2'",
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                { file: 'package/domain/User.java', renameTo:    "${generator.javaDir}domain/User.java" },
                { file: 'package/domain/Authority.java', renameTo:    "${generator.javaDir}domain/Authority.java" },
                { file: 'package/service/UserService.java', renameTo:    "${generator.javaDir}service/UserService.java" },
                {
                    file: 'package/service/dto/package-info.java',
                    renameTo:    "${generator.javaDir}service/dto/package-info.java"
                },
                { file: 'package/service/dto/UserDTO.java', renameTo:    "${generator.javaDir}service/dto/UserDTO.java" },
                {
                    file: 'package/service/mapper/package-info.java',
                    renameTo:    "${generator.javaDir}service/mapper/package-info.java"
                },
                {
                    file: 'package/service/mapper/UserMapper.java',
                    renameTo:    "${generator.javaDir}service/mapper/UserMapper.java"
                },
                {
                    file: 'package/repository/UserRepository.java',
                    renameTo:    "${generator.javaDir}repository/UserRepository.java"
                },
                {
                    file: 'package/repository/AuthorityRepository.java',
                    renameTo:    "${generator.javaDir}repository/AuthorityRepository.java"
                },
                { file: 'package/web/rest/UserResource.java', renameTo:    "${generator.javaDir}web/rest/UserResource.java" },
                {
                    file: 'package/web/rest/vm/ManagedUserVM.java',
                    renameTo:    "${generator.javaDir}web/rest/vm/ManagedUserVM.java"
                }
            ]
        },
        {
            condition:                 generator.skipUserManagement &&
                generator.authenticationType === 'oauth2' &&
                ['monolith', 'gateway'].includes(generator.applicationType),
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                {
                    file: 'package/web/rest/AccountResource.java',
                    renameTo:    "${generator.javaDir}web/rest/AccountResource.java"
                }
            ]
        },
        {
            condition: "generator.skipUserManagement && generator.authenticationType === 'oauth2'",
            path: SERVER_TEST_SRC_DIR,
            templates: [
                {
                    file: 'package/security/SecurityUtilsUnitTest.java',
                    renameTo:    "${generator.testDir}security/SecurityUtilsUnitTest.java"
                },
                {
                    file: 'package/service/UserServiceIntTest.java',
                    renameTo:    "${generator.testDir}service/UserServiceIntTest.java"
                },
                {
                    file: 'package/web/rest/UserResourceIntTest.java',
                    renameTo:    "${generator.testDir}web/rest/UserResourceIntTest.java"
                }
            ]
        },
        {
            condition:                 generator.skipUserManagement &&
                generator.authenticationType === 'oauth2' &&
                ['monolith', 'gateway'].includes(generator.applicationType),
            path: SERVER_TEST_SRC_DIR,
            templates: [
                {
                    file: 'package/web/rest/AccountResourceIntTest.java',
                    renameTo:    "${generator.testDir}web/rest/AccountResourceIntTest.java"
                }
            ]
        },
        {
            condition:                 generator.skipUserManagement && generator.authenticationType === 'oauth2' && generator.searchEngine === 'elasticsearch',
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                {
                    file: 'package/repository/search/UserSearchRepository.java',
                    renameTo:    "${generator.javaDir}repository/search/UserSearchRepository.java"
                }
            ]
        },
        {
            condition:                 generator.skipUserManagement && generator.authenticationType === 'oauth2' && generator.searchEngine === 'elasticsearch',
            path: SERVER_TEST_SRC_DIR,
            templates: [
                {
                    file: 'package/repository/search/UserSearchRepositoryMockConfiguration.java',
                    renameTo:    "${generator.testDir}repository/search/UserSearchRepositoryMockConfiguration.java"
                }
            ]
        },
        {
            condition:                 generator.skipUserManagement &&
                generator.authenticationType === 'oauth2' &&
                ['sql', 'mongodb'].includes(generator.databaseType),
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                {
                    file: 'package/repository/CustomAuditEventRepository.java',
                    renameTo:    "${generator.javaDir}repository/CustomAuditEventRepository.java"
                },
                {
                    file: 'package/repository/AuthorityRepository.java',
                    renameTo:    "${generator.javaDir}repository/AuthorityRepository.java"
                },
                {
                    file: 'package/repository/PersistenceAuditEventRepository.java',
                    renameTo:    "${generator.javaDir}repository/PersistenceAuditEventRepository.java"
                },
                {
                    file: 'package/service/AuditEventService.java',
                    renameTo:    "${generator.javaDir}service/AuditEventService.java"
                },
                { file: 'package/web/rest/AuditResource.java', renameTo:    "${generator.javaDir}web/rest/AuditResource.java` "}
            ]
        },
        {
            condition:                 generator.skipUserManagement &&
                generator.authenticationType === 'oauth2' &&
                ['sql', 'mongodb'].includes(generator.databaseType),
            path: SERVER_TEST_SRC_DIR,
            templates: [
                {
                    file: 'package/repository/CustomAuditEventRepositoryIntTest.java',
                    renameTo:    "${generator.testDir}repository/CustomAuditEventRepositoryIntTest.java"
                },
                {
                    file: 'package/web/rest/AuditResourceIntTest.java',
                    renameTo:    "${generator.testDir}web/rest/AuditResourceIntTest.java"
                }
            ]
        },
        {
            condition: "!generator.skipUserManagement",
            path: SERVER_MAIN_RES_DIR,
            templates: [
                'templates/mail/activationEmail.html',
                'templates/mail/creationEmail.html',
                'templates/mail/passwordResetEmail.html'
            ]
        },
        {
            condition: "!generator.skipUserManagement && ['sql', 'mongodb', 'couchbase'].includes(generator.databaseType)",
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                { file: 'package/domain/Authority.java', renameTo:    "${generator.javaDir}domain/Authority.java" },
                {
                    file: 'package/repository/CustomAuditEventRepository.java',
                    renameTo:    "${generator.javaDir}repository/CustomAuditEventRepository.java"
                },
                {
                    file: 'package/repository/AuthorityRepository.java',
                    renameTo:    "${generator.javaDir}repository/${generator.reactiveRepository}AuthorityRepository.java"
                },
                {
                    file: 'package/repository/PersistenceAuditEventRepository.java',
                    renameTo:    "${generator.javaDir}repository/PersistenceAuditEventRepository.java"
                },
                {
                    file: 'package/service/AuditEventService.java',
                    renameTo:    "${generator.javaDir}service/AuditEventService.java"
                },
                { file: 'package/web/rest/AuditResource.java', renameTo:    "${generator.javaDir}web/rest/AuditResource.java` "}
            ]
        },
        {
            condition: "!generator.skipUserManagement",
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                /* User management java domain files */
                { file: 'package/domain/User.java', renameTo:    "${generator.javaDir}domain/User.java }"},
                {
                    file: 'package/repository/UserRepository.java',
                    renameTo:    "${generator.javaDir}repository/${generator.reactiveRepository}UserRepository.java"
                },

                /* User management java service files */
                { file: 'package/service/UserService.java', renameTo:    "${generator.javaDir}service/UserService.java" },
                { file: 'package/service/MailService.java', renameTo:    "${generator.javaDir}service/MailService.java"},

                /* User management java web files */
                {
                    file: 'package/service/dto/package-info.java',
                    renameTo:    "${generator.javaDir}service/dto/package-info.java"
                },
                { file: 'package/service/dto/UserDTO.java', renameTo:    "${generator.javaDir}service/dto/UserDTO.java" },
                {
                    file: 'package/service/dto/PasswordChangeDTO.java',
                    renameTo:    "${generator.javaDir}service/dto/PasswordChangeDTO.java"
                },
                {
                    file: 'package/web/rest/vm/ManagedUserVM.java',
                    renameTo:    "${generator.javaDir}web/rest/vm/ManagedUserVM.java"
                },
                {
                    file: 'package/web/rest/AccountResource.java',
                    renameTo:    "${generator.javaDir}web/rest/AccountResource.java"
                },
                { file: 'package/web/rest/UserResource.java', renameTo:    "${generator.javaDir}web/rest/UserResource.java" },
                {
                    file: 'package/web/rest/vm/KeyAndPasswordVM.java',
                    renameTo:    "${generator.javaDir}web/rest/vm/KeyAndPasswordVM.java"
                },
                {
                    file: 'package/service/mapper/package-info.java',
                    renameTo:    "${generator.javaDir}service/mapper/package-info.java"
                },
                {
                    file: 'package/service/mapper/UserMapper.java',
                    renameTo:    "${generator.javaDir}service/mapper/UserMapper.java"
                }
            ]
        },
        {
            condition: "!generator.skipUserManagement && generator.searchEngine === 'elasticsearch'",
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                {
                    file: 'package/repository/search/UserSearchRepository.java',
                    renameTo:    "${generator.javaDir}repository/search/UserSearchRepository.java"
                }
            ]
        },
        {
            condition: "!generator.skipUserManagement && generator.searchEngine === 'elasticsearch'",
            path: SERVER_TEST_SRC_DIR,
            templates: [
                {
                    file: 'package/repository/search/UserSearchRepositoryMockConfiguration.java',
                    renameTo:    "${generator.testDir}repository/search/UserSearchRepositoryMockConfiguration.java"
                }
            ]
        },
        {
            condition: "!generator.skipUserManagement && generator.authenticationType === 'jwt'",
            path: SERVER_TEST_SRC_DIR,
            templates: [
                {
                    file: 'package/security/jwt/TokenProviderTest.java',
                    renameTo:    "${generator.testDir}security/jwt/TokenProviderTest.java"
                },
                {
                    file: 'package/security/jwt/JWTFilterTest.java',
                    renameTo:    "${generator.testDir}security/jwt/JWTFilterTest.java"
                },
                {
                    file: 'package/web/rest/UserJWTControllerIntTest.java',
                    renameTo:    "${generator.testDir}web/rest/UserJWTControllerIntTest.java"
                }
            ]
        },
        {
            // TODO : add tests for reactive
            condition:                 !generator.reactive && !generator.skipUserManagement && ['sql', 'mongodb', 'couchbase'].includes(generator.databaseType),
            path: SERVER_TEST_SRC_DIR,
            templates: [
                {
                    file: 'package/web/rest/AuditResourceIntTest.java',
                    renameTo:    "${generator.testDir}web/rest/AuditResourceIntTest.java"
                }
            ]
        },
        {
            condition: "!generator.skipUserManagement && ['sql', 'mongodb', 'couchbase'].includes(generator.databaseType)",
            path: SERVER_TEST_SRC_DIR,
            templates: [
                {
                    file: 'package/repository/CustomAuditEventRepositoryIntTest.java',
                    renameTo:    "${generator.testDir}repository/CustomAuditEventRepositoryIntTest.java"
                }
            ]
        },
        {
            condition: "!generator.skipUserManagement && generator.cucumberTests",
            path: SERVER_TEST_SRC_DIR,
            templates: [
                {
                    file: 'package/cucumber/stepdefs/UserStepDefs.java',
                    renameTo:    "${generator.testDir}cucumber/stepdefs/UserStepDefs.java"
                },
                '../features/user/user.feature'
            ]
        },
        {
            condition: "!generator.skipUserManagement",
            path: SERVER_TEST_RES_DIR,
            templates: [
                /* User management java test files */
                'templates/mail/testEmail.html',
                'i18n/messages_en.properties'
            ]
        },
        {
            condition: "!generator.skipUserManagement",
            path: SERVER_TEST_SRC_DIR,
            templates: [
                {
                    file: 'package/service/MailServiceIntTest.java',
                    renameTo:    "${generator.testDir}service/MailServiceIntTest.java"
                },
                {
                    file: 'package/service/UserServiceIntTest.java',
                    renameTo:    "${generator.testDir}service/UserServiceIntTest.java"
                },
                {
                    file: 'package/security/SecurityUtilsUnitTest.java',
                    renameTo:    "${generator.testDir}security/SecurityUtilsUnitTest.java"
                },
                {
                    file: 'package/web/rest/AccountResourceIntTest.java',
                    renameTo:    "${generator.testDir}web/rest/AccountResourceIntTest.java"
                },
                {
                    file: 'package/web/rest/UserResourceIntTest.java',
                    renameTo:    "${generator.testDir}web/rest/UserResourceIntTest.java"
                }
            ]
        }
    ]
};
/*
function writeFiles() {
    return {
        setUp() {
            this.javaDir = `${this.packageFolder}/`;
            this.testDir = `${this.packageFolder}/`;

            // Create Java resource files
            mkdirp(SERVER_MAIN_RES_DIR);
            mkdirp(`${SERVER_TEST_SRC_DIR}/${this.testDir}`);
            this.generateKeyStore();
        },

        cleanupOldServerFiles() {
            cleanup.cleanupOldServerFiles(
                this,
                `${SERVER_MAIN_SRC_DIR}/${this.javaDir}`,
                `${SERVER_TEST_SRC_DIR}/${this.testDir}`,
                SERVER_MAIN_RES_DIR,
                SERVER_TEST_RES_DIR
            );
        },

        writeFiles() {
            this.writeFilesToDisk(serverFiles, this, false, this.fetchFromInstalledJHipster('server/templates'));
        }
    };
}

module.exports = {
    writeFiles,
    serverFiles
};
*/