import {shallowMount} from '@vue/test-utils'
import Legend from '@/components/Legend.vue'

describe('Legend.vue', () => {
  it('Test the content of the Legend component', () => {
    const wrapper = shallowMount(Legend, {
      propsData: {
        legendMap: {
          "groupColor": {"id1": "red", "id2": "blue"},
          "rankColor": {"rankid1": "red", "rankid2": "blue"}
        }
      }
    })

    const groupWrapper = wrapper.find('.group-legend')
    expect(groupWrapper.findAll('.item').length).toBe(2)
    expect(groupWrapper.findAll('.item').at(0).contains('.square')).toBe(true)
    expect(groupWrapper.findAll('.item').at(0).contains('.group-id')).toBe(true)
    const squareItem0 = groupWrapper.findAll('.item').at(0).find('.square')
    expect(squareItem0.attributes().style).toBe('background-color: red;')
    const groupIdItem0 = groupWrapper.findAll('.item').at(0).find('.group-id')
    expect(groupIdItem0.text()).toBe('ID: id1')
    const squareItem1 = groupWrapper.findAll('.item').at(1).find('.square')
    expect(squareItem1.attributes().style).toBe('background-color: blue;')
    const groupIdItem1 = groupWrapper.findAll('.item').at(1).find('.group-id')
    expect(groupIdItem1.text()).toBe('ID: id2')

    const rankLegend = wrapper.find('.rank-legend')
    expect(rankLegend.findAll('.item').length).toBe(2)
    expect(rankLegend.findAll('.item').at(0).contains('.square')).toBe(true)
    expect(rankLegend.findAll('.item').at(0).contains('.rank-id')).toBe(true)
    const squareRankItem0 = rankLegend.findAll('.item').at(0).find('.square')
    expect(squareRankItem0.attributes().style).toBe('border-color: red;')
    const rankIdItem0 = rankLegend.findAll('.item').at(0).find('.rank-id')
    expect(rankIdItem0.text()).toBe('rankid1')
    const squareRankItem1 = rankLegend.findAll('.item').at(1).find('.square')
    expect(squareRankItem1.attributes().style).toBe('border-color: blue;')
    const rankIdItem1 = rankLegend.findAll('.item').at(1).find('.rank-id')
    expect(rankIdItem1.text()).toBe('rankid2')
  })
})
