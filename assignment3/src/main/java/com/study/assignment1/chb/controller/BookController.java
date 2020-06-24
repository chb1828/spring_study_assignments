package com.study.assignment1.chb.controller;

import com.study.assignment1.chb.entity.Book;
import com.study.assignment1.chb.entity.Genres;
import com.study.assignment1.chb.entity.Language;
import com.study.assignment1.chb.repository.BookRepository;
import com.study.assignment1.chb.repository.CustomBookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/books")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class BookController {

    private final BookRepository bookRepository;
    private final CustomBookRepository customBookRepository;

    @GetMapping
    public Page<Book> findAll(@RequestParam(value = "pageNumber") int pageNumber,
                              @RequestParam(value = "pageSize") int pageSize,
                              @RequestParam(value = "sortDir") String sortDir,
                              @RequestParam(value = "sortBy") String sortBy) {
        return customBookRepository.getList(PageRequest.of(pageNumber,pageSize
                ,sortDir.equalsIgnoreCase("asc")? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending()));
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

    @GetMapping("/languages")
    public List<Language> findAllLanguages() {
        return Arrays.asList(Language.values());
    }
    @GetMapping("/genres")
    public List<Genres> findAlGenres() {
        return Arrays.asList(Genres.values());
    }
}
