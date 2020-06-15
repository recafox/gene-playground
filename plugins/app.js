/*
data:
[
  'title':title,
  'status':false,
]
*/

// localStorage.clear();

;(function(gee, $) {
  gee.debug = 1;
  gee.hook('changeToUnfinished', function(me) {
    window.location.hash = 'unfinished';
    gee.currentView = 'unfinished';
    me.addClass('active');
    let siblings = Array.from(me.siblings('.tab'));
    siblings.forEach((sib) => {
      if (sib.classList.contains('active')) {
        sib.classList.remove('active');
      }
    });
    const content = $('.content');
    content[0].innerHTML = '';
    content.append(`<div class="input-group">
    <input type="text" class="todo-input" placeholder="點擊輸入">
    <button class='btn add gee' data-gene='click:addInput'>新增</button>
    </div>
    <div class="todo-content">
    </div>`);
    let str = '';
    let unfinishedArr = gee.todoList.filter(item => item.status === false);
    if (unfinishedArr.length > 0) {
      unfinishedArr.forEach((todo) => {
        str += gee.exe('createTodoTemplate', todo);
      });      
    } else {
      str += `<div class='todo-item'>沒有東西喔</div>`
    }
    content.append(str);
    gee.init();

    
  });
  gee.hook('changeToFinished', function(me) {
    window.location.hash = 'finished';
    gee.currentView = 'finished';
    me.addClass('active');
    const content = $('.content');
    let siblings = Array.from(me.siblings('.tab'));
    siblings.forEach((sib) => {
      if (sib.classList.contains('active')) {
        sib.classList.remove('active');
      }
    });
    content[0].innerHTML = '';
    let str = '';
    const finishedArr = gee.todoList.filter(item => item.status === true);
    if (finishedArr.length > 0) {
      finishedArr.forEach((todo) => {
        str += gee.exe('createTodoTemplate', todo);
      });
    } else {
      str += `<div class='todo-item'>沒有東西喔</div>`
    }
    content.append(str);
    gee.init();

  });
  gee.hook('changeToAll', function(me) {
    window.location.hash = 'all';
    gee.currentView = 'all';
    me.addClass('active');
    const content = $('.content');
    let siblings = Array.from(me.siblings('.tab'));
    siblings.forEach((sib) => {
      if (sib.classList.contains('active')) {
        sib.classList.remove('active');
      }
    });
    content[0].innerHTML = '';
    content.append(`<div class="input-group">
    <input type="text" class="todo-input" placeholder="點擊輸入">
    <button class='btn add gee' data-gene='click:addInput'>新增</button>
    </div>
    <div class="todo-content">
    </div>`);
    gee.initTodo();
    gee.init();
  });
  gee.hook('addInput', function(me) {
    const input = me.siblings('input')[0];
    const todoItem = {
      title: input.value,
      status: false
    };
    if (input.value.length > 0) {
      gee.todoList.push(todoItem);
      gee.exe('updateLocalStorage');
      input.value = '';
      let str = gee.exe('createTodoTemplate', todoItem);
      $('.todo-content').append(str);
      
    } else {
      gee.alert({
        title: '提醒',
        txt: '你很閒嘛'
      });
    }
  });
  gee.hook('createTodoTemplate', function(item) {
    let checkStatus = (item.status === true)? 'checked' : '';
    // let disableStatus = (item.status === true) ? 'disabled' : '';
    return `
      <div class="todo-item">
      <input type="checkbox" class='todo-check gee' data-gene="change:checkTodo" ${checkStatus}>
      <label for='todo-check' data-title="${item.title}">${item.title}</label>
      <div class="btn-group">
        <button class='btn edit'>編輯</button>
        <button class='btn delete'>刪除</button>
      </div>
      </div>`;
  });
  // gee.hook('createFinishTemplate', function(item) {
  //   let checkStatus = (item.status === true)? 'checked' : '';
  //   return `
  //     <div class="todo-item">
  //     <input type="checkbox" class='todo-check gee' data-gene="change:checkTodo" ${checkStatus} disabled>
  //     <label for='todo-check' data-title="${item.title}">${item.title}</label>
  //     <div class="btn-group">
  //       <button class='btn edit'>編輯</button>
  //       <button class='btn delete'>刪除</button>
  //     </div>
  //     </div>`;
  // });
  gee.hook('checkTodo', function(me) {
    let newStatus = me[0].checked;
    let todoTitle = me.siblings('label')[0].dataset.title;
    gee.todoList.forEach((todo) => {
      if (todo.title === todoTitle) {
        todo.status = newStatus;
      };
    });
    gee.exe('updateLocalStorage');
  });
  gee.hook('initTodo', function() {
    let str = '';
    if(gee.todoList.length > 0) {
      gee.todoList.forEach((item) => {
        str += gee.exe('createTodoTemplate', item);
      })
    }
    $('.todo-content').append(str);
  });
  gee.hook('updateLocalStorage', function() {
    localStorage.setItem(gee.storageName, JSON.stringify(gee.todoList));
  });
}(gee, jQuery));