const API_ENDPOINT = 'https://asr.reazon-research.org/api/transcribe';

var dom = {
    container: null,
    input: null,
    tbody: null,
    progress: null,
}

var state = {
    xhr: null,
    timer_id: null,
    start_ms: null
}

function render_table(resp) {
    if (!resp.segments)
        return ""

    return resp.segments.map((s) => {
        return `<tr>
<td><center>${s.start_seconds.toFixed(2)}</center></td>
<td><center>${s.end_seconds.toFixed(2)}</center></td>
<td>${s.text}</td>
</tr>`;
    }).join("");
}

function on_success() {
    var resp = JSON.parse(state.xhr.response);
    if (resp.text) {
        dom.tbody.innerHTML = render_table(resp);
    }
    dom.container.className = 'done';
    clearInterval(state.timer_id);
    progress_set(100);
}

function on_error() {
    dom.container.className = 'err';
    clearInterval(state.timer_id);
    progress_set(100);
}

function on_start()
{
    dom.container.className = 'loading';
    progress_reset();
    state.start_ms = Date.now();
    clearInterval(state.timer_id);
    state.timer_id = setInterval(on_update, 500);
}

function on_update()
{
    var n = 100 - 100 / Math.sqrt((Date.now() - state.start_ms) / 1000 + 1)
    progress_set(n);
}

function on_drop(evt)
{
    evt.preventDefault();
    if (evt.dataTransfer.files) {
        var file = evt.dataTransfer.files[0];
        if (file) {
            return do_request(file);
        }
    }
}

function progress_set(n)
{
    dom.progress.style.opacity = 1;
    dom.progress.style.width = n + "%";
}

function progress_reset()
{
    dom.progress.style.opacity = 0;
    dom.progress.style.width = "0%";
}

function do_request(file)
{
    if (!file) {
        file = dom.input.files[0];
        if (!file) {
            return;
        }
    }

    var formData = new FormData()
    formData.append('data', file);

    state.xhr = new XMLHttpRequest();
    state.xhr.onreadystatechange = () => {
      if (state.xhr.readyState == XMLHttpRequest.DONE) {
        if (state.xhr.status == 200) {
            on_success()
        } else {
            on_error();
        }
      }
    }
    state.xhr.open('POST', API_ENDPOINT, true)
    state.xhr.send(formData);
    on_start();
}

window.addEventListener('DOMContentLoaded', (e) => {
    dom.container = document.querySelector('#demo');
    dom.input = document.querySelector('#demo-file');
    dom.tbody = document.querySelector('#demo-tbody');
    dom.progress = document.querySelector('#demo .progress span');
    dom.container.addEventListener('drop', on_drop);
    dom.container.addEventListener('dragover', (evt) => {
        evt.preventDefault();
    });
    dom.input.addEventListener('change', (evt) => {
        do_request(null)
    });
});
