export default {
    changeQueryWord(state, payload) {
        state.queryWord.queryType = payload.queryType;
        state.queryWord.queryContent = payload.queryContent;
    },
    addTag(state, payload) {
        if (payload.newTag === "") {
            return;
        }
        for (let x = 0; x < state.essays.length; x++) {
            if (state.essays[x].essayTitle === payload.targetTitle) {
                let passed = state.essays[x].tags.every((tag) => {
                    if (tag.toUpperCase() !== payload.newTag.trim().toUpperCase()) {
                        return true;
                    }
                });
                if (passed) {
                    state.essays[x].tags.push(payload.newTag.trim());
                    return;
                }
            }
        }
    },
    removeTag(state, payload) {
        for (let y = 0; y < state.essays.length; y++) {
            if (state.essays[y].essayTitle === payload.targetTitle) {
                let positionIndex = state.essays[y].tags.indexOf(payload.tagToRemove);
                state.essays[y].tags.splice(positionIndex, 1);
                return;
            }
        }
    },
    setEditorAreaTrue(state, payload) {
        for (let x = 0; x < state.essays.length; x++) {
            if (state.essays[x].essayTitle === payload) {
                state.essays[x].editorAreaShow = true;
                return;
            }
        }
    },
    setEditorAreaFalse(state, payload) {
        for (let x = 0; x < state.essays.length; x++) {
            if (state.essays[x].essayTitle === payload) {
                state.essays[x].editorAreaShow = false;
                return;
            }
        }
    },
    toggleEditorMode(state) {
        state.editorMode = !state.editorMode;
    }
}