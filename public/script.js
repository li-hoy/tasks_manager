const app = new Vue({
    el: '#app',
    data: {
        tasks: [
            {
                id: 1,
                name: 'Задача первая',
                comment: 'описание',
                status: 1,
            },
            {
                id: 2,
                name: 'Задача вторая',
                comment: 'коммент',
                status: 0,
            }
        ],
        user: {},
    },
    methods: {
        load: async function () {
            const response = await fetch('/tasks') ;

            if (!response.ok) {
                console.error("Ошибка HTTP: " + response.status);

                return;
            }

            this.tasks = (await response.json()).tasks;
        },
        add: async function () {
            task = {
                id: 1,
                name: 'название',
                discription: 'описание',
                status: 1,
            };

            // const response = await fetch('/tasks', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json; charset=utf-8',
            //     },
            //     body: JSON.stringify(task)
            // });

            // if (!response.ok) {
            //     console.error("Ошибка HTTP: " + response.status);

            //     return;
            // }

            this.tasks.push(task);
        },
        remove: async function ($event) {
            const task_id = $event.target.closest('.task').dataset.id;

            // const response = await fetch('/tasks/?id=' + task_id, {
            //     method: 'DELETE',
            // });

            for (const task_index in this.tasks) {
                const task = this.tasks[task_index];

                if (task.id == task_id) {
                    this.tasks.splice(task_index);

                    break;
                }
            }
        },
        toggleStatus: function ($event) {
            const task_id = $event.target.closest('.task').dataset.id;

            const tasks = this.tasks;

            tasks.forEach(task => {
                if (task.id == task_id) {
                    task.status = (task.status == 1 ? 0 : 1);

                    return false;
                }
            });
        }
    },
    computed: {
        getTasks() {
            return this.tasks;
        },
    },
    template: `
        <div id="app">
            <div id="user-panel" class="panel panel-header"></div>
            <div id="main-control-panel" class="panel panel-control"></div>
            <div id="tasks-list" class="panel panel-list">
                <div
                    v-for="task in getTasks"
                    v-bind:class="[
                        'task',
                        {
                            'task-done': (task.status == 1),
                        }
                    ]"
                    :data-id="task.id"
                >
                    <div class="task-info">
                        <div class="task-info-name"> {{task.name}}</div>
                        <div class="task-info-comment">{{task.comment}}</div>
                        <div
                            v-if="task.status === 1"
                            @click="toggleStatus($event)"
                            class="task-info-status task-info-status-done"
                        >
                            выполнено
                        </div>
                        <div
                            v-else
                            @click="toggleStatus($event)"
                            class="task-info-status"
                        >
                            не выполнено
                        </div>
                    </div>
                    <div class="task-control">
                        <button
                            class="task-control-remove"
                            @click="remove($event)"
                        >удалить</button>
                    </div>
                </div>
            </div>
        </div>
    `
});