import {shallowMount} from '@vue/test-utils'
import Row from '@/components/Row.vue'
import Seat from '@/components/Seat.vue'

describe('Row.vue', () => {
  it('Test the content of the Row component', () => {
    const wrapper = shallowMount(Row, {
      propsData: {
        row: {
          seats: {
            "1": {groupColor: 'red', rankColor: 'blue', seat: 'seat1'},
            "2": {groupColor: 'red', rankColor: 'blue', seat: 'seat2'}
          }, rowName: 'row1'
        },
        name: 'sectionTest',
      }
    })

    expect(wrapper.classes('row')).toBe(true)
    expect(wrapper.findAll(Seat).length).toBe(2)
    //test style

  })
})
