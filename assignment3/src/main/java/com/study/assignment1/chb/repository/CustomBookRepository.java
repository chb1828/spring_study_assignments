package com.study.assignment1.chb.repository;

import com.study.assignment1.chb.entity.Book;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class CustomBookRepository {

    private final BookRepository bookRepository;

    public Page<Book> getList(Pageable pageable) {
       return bookRepository.findAll(pageable);
    }
}
