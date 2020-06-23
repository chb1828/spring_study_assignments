package com.study.assignment1.chb.controller;

import com.study.assignment1.chb.entity.Book;
import com.study.assignment1.chb.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/books")
@RequiredArgsConstructor
public class BookController {

    private final BookRepository bookRepository;

    @GetMapping
    public List<Book> findAll() {
        return (List<Book>) bookRepository.findAll();
    }

    @GetMapping("{id}")
    public Optional<Book> findById(@PathVariable Long id){
        return bookRepository.findById(id);
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public Book save(@RequestBody Book book) {
        return bookRepository.save(book);
    }

    @DeleteMapping("{id}")
    public void deleteById(@PathVariable Long id){
        bookRepository.deleteById(id);
    }
}
