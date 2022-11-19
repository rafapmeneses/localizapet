package br.com.localizapet.security;

import br.com.localizapet.security.jwt.AuthEntryPointJwt;
import br.com.localizapet.security.jwt.AuthTokenFilter;
import br.com.localizapet.security.services.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.header.writers.StaticHeadersWriter;

@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig {
	@Autowired
	private UserDetailsServiceImpl userDetailsService;

	@Autowired
	private AuthEntryPointJwt unauthorizedHandler;

	@Bean
	public AuthTokenFilter authenticationJwtTokenFilter() {
		return new AuthTokenFilter();
	}

	@Bean
	public DaoAuthenticationProvider authenticationProvider() {
	  DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();

	  authProvider.setUserDetailsService(userDetailsService);
	  authProvider.setPasswordEncoder(passwordEncoder());

	  return authProvider;
	}

	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
		return authConfig.getAuthenticationManager();
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http.cors().and().csrf().disable()
			.exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()
			.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
			.authorizeRequests().antMatchers("/auth/**").permitAll()
			.antMatchers("/test/**").permitAll().and()
			.authorizeRequests().anyRequest().authenticated()
			.and().headers()
			.addHeaderWriter(new StaticHeadersWriter("Access-Control-Allow-Credentials","true"))
			.addHeaderWriter(new StaticHeadersWriter("Access-Control-Allow-Origin", "http://localhost:3000"))
			.addHeaderWriter(new StaticHeadersWriter("Access-Control-Allow-Headers", "*"))
			.addHeaderWriter(new StaticHeadersWriter("Access-Control-Expose-Headers", "*"))
			.addHeaderWriter(new StaticHeadersWriter("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS"))
			.and().httpBasic();

		http.authenticationProvider(authenticationProvider());

		http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);

		return http.build();
	}
}
