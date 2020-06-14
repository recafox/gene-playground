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
    console.log('changeToUnfinished');
  });
  gee.hook('changeToFinished', function(me) {
    console.log('changeToFinished');
  });
  gee.hook('addInput', function(me) {
    console.log('add input');
    const input = me.siblings('input')[0];
    let localArr = (localStorage.getItem(gee.storageName))? JSON.parse(localStorage.getItem(gee.storageName)) : [];
    const todoItem = {
      title: input.value,
      status: false
    };
    if (input.value.length > 0) {
      localArr.push(todoItem);
      localStorage.setItem(gee.storageName, JSON.stringify(localArr));
      input.value = '';
      let str = gee.exe('createTodoTemplate', todoItem.title);
      $('.todo-content').append(str);
     
      
    } else {
      gee.alert({
        title: '提醒',
        txt: '你很閒嘛'
      });
    }
  });
  gee.hook('createTodoTemplate', function(title) {
    return `
      <div class="todo-item">
      <input type="checkbox" class='todo-check'>
      <label for='todo-check'>${title}</label>
      <div class="btn-group">
        <button class='btn edit'>編輯</button>
        <button class='btn delete'>刪除</button>
      </div>
      </div>`;
  });
  gee.hook('initTodo', function() {
    const localArr = (localStorage.getItem(gee.storageName))? JSON.parse(localStorage.getItem(gee.storageName)) : [];
    let str = '';
    if(localArr.length > 0) {
      localArr.forEach((item) => {
        str += gee.exe('createTodoTemplate', item.title);
      })
    }
    $('.todo-content').append(str);
  });
}(gee, jQuery));