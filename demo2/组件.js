
const school = Vue.extend({
    name: 'abc',
    template: `
          <div>
          <h1>{{ name}}
            <stu></stu>
          </h1>
          </div>`,
    data() {
        return {
            name: '牛'
        }
    },
});
