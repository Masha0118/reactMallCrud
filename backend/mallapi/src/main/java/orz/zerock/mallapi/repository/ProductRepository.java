package orz.zerock.mallapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import orz.zerock.mallapi.domain.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
