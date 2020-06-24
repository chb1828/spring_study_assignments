package com.study.assignment1.chb.repository;

import com.study.assignment1.chb.entity.Book;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface BookRepository extends PagingAndSortingRepository<Book,Long> {
}
