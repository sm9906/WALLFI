package com.shinhan.walfi.domain;

import com.shinhan.walfi.domain.banking.Account;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;


@Entity
@Getter
@Setter
@ToString
public class User implements Serializable, UserDetails {

    @Id
    private String userId;

    private String email;

    private String password;

    private String name;

    private LocalDateTime birthDate;

    private String phoneNumber;

    @Column(name = "대표계좌")
    private String 대표계좌;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<Account> accounts = new ArrayList<>();

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getUsername() {
        return null;
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return false;
    }
}
