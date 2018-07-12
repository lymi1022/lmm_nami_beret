import * as widgets from './widgets'
const UPDATE_BUILDER_CONTENT = 'UPDATE_BUILDER_CONTENT'
const SET_ACTIVE_WIDGET = 'SET_ACTIVE_WIDGET'
const UPDATE_WIDGET = 'UPDATE_WIDGET'

const state = {
  widgets: [],
  activeWidgetId: null,
}
const getters = {
  activeWidget: (state) => {
    return _.find(state.widgets, {
      id: state.activeWidgetId,
    }) || {}
  }
}
const actions = {
  scrollTopWidget({ commit }) {
    const $activeWidget = document.querySelector('.widget-item--active')
    const $builderContent = document.querySelector('.builder__content')
    $builderContent.scrollTop = $activeWidget.offsetTop
  },
  addWidget({ commit, state }, {factory: Factory, index}) {
    console.log(1);
    console.log(index)
    const widget = new Factory()
    let widgets
    if (!_.isUndefined(index)) {
      widgets = state.widgets.map((item, i) => {
        if (i === index) {
          return widget
        }
        return item
      })
    } else {
      widgets = state.widgets.concat(widget)
    }
    commit(UPDATE_BUILDER_CONTENT, { widgets })
    commit(SET_ACTIVE_WIDGET, {
      id: widget.id,
    })
  },
  setActiveWidget({commit}, {id}) {
    commit(SET_ACTIVE_WIDGET, {id})
  },
  updatWidget({ commit, state}, {id, model}) {
    commit(UPDATE_WIDGET, { model, id })
  },
  updateBuilderContent({ commit, state}, widgets) {
    commit(UPDATE_BUILDER_CONTENT,  { widgets })
  }
}
const mutations = {
  [UPDATE_BUILDER_CONTENT](state, { widgets }) {
    state.widgets = widgets
  },
  [SET_ACTIVE_WIDGET](state, { id }) {
    state.activeWidgetId = id
  },
  [UPDATE_WIDGET](state, {id, model}) {
    state.widgets.forEach((widget, index) => {
      if (id === widget.id) {
        const newModel = widgets.Widget.mergeModel(widget.model, model)
        state.widgets[index].model = newModel
        // 相当于下面的
        // state.widgets[index].model = _.mergeWith(widget.model, model)
      }
    })
  }
}
export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
}