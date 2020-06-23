package com.study.assignment1.chb.repository;

import com.study.assignment1.chb.entity.Book;
import org.springframework.data.repository.CrudRepository;

public interface BookRepository extends CrudRepository<Book,Long> {

}
