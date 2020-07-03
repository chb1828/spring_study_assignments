package com.study.assignment1.chb;

import com.study.assignment1.chb.repository.BookRepository;
import com.study.assignment1.chb.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
@EnableJpaAuditing
public class ChbApplication {

    @Autowired
    private BookRepository repository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public static void main(String[] args) {
        SpringApplication.run(ChbApplication.class, args);
    }

/*    @Bean
    InitializingBean sendDatabase() {
        return () -> {
            for(int i=1; i<=500; i++) {
                repository.save(Book.builder()
                        .title("Spring Microservices in Action"+i)
                        .author("John Carnell"+i)
                        .coverPhotoURL("https://file3.instiz.net/data/cached_img/upload/2019/06/25/10/f168bce1933bc101b3fb6725ec0f80c6.jpg")
                        .isbnNumber(1617293989L)
                        .price(2776.00+i)
                        .language("ENGLISH")
                        .genre("TECHNOLOGY")
                        .build());
            }
            if(!userRepository.findById(1L).isPresent()) {
                userRepository.save(User.builder()
                        .username("admin")
                        .password(passwordEncoder.encode("admin"))
                        .age(22)
                        .role(Classes.ROLE_USER)
                        .build());
            }
        };
    }*/
}
