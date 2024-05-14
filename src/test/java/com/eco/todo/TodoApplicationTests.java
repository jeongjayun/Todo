package com.eco.todo;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayDeque;
import java.util.Deque;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class TodoApplicationTests {

//	@Test
//	void contextLoads() {
//	}
	
	@Test
	public void whenPush_addsAtFirst() {
	    Deque<String> stack = new ArrayDeque<>();
	    stack.push("first");
	    stack.push("second");
	 
	    assertEquals("second", stack.getFirst());
	}

	
	@Test
	public void whenPop_removesLast() {
	    Deque<String> stack = new ArrayDeque<>();
//	    stack.push("first");
//	    stack.push("second");
	 
	    assertEquals("second", stack.pop());
	}

	
	@Test
	public void whenOffer_addsAtLast() {
	    Deque<String> queue = new ArrayDeque<>();
	    queue.offer("first");
	    queue.offer("second");
	 
	    assertEquals("second", queue.getLast());
	}

	@Test
	public void whenPoll_removesFirst() {
	    Deque<String> queue = new ArrayDeque<>();
	    queue.offer("first");
	    queue.offer("second");
	 
	    assertEquals("first", queue.poll());
	}

	
}
