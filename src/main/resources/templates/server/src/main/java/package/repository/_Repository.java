package {{project.projectPackage}}.repository;

import {{project.projectPackage}}.domain.{{repository.name}};

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;


public interface <%name%>Repository extends JpaRepository<<%=name%>, Long> {

}
