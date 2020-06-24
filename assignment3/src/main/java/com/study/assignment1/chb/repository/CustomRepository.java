package com.study.assignment1.chb.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CustomRepository<T> {

    Page<T> getList(Pageable pageable);
}
