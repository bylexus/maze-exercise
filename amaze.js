
// @see https://thenerdshow.com/amaze.html
// Copyright (C) 2013 by Henry Kroll
/* Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License. 

Adapted by Alexander Schenkel to fit his own needs
*/
var RecursiveBacktrackerGenerator = function(cols, rows) {
    this.cols = Number(cols) || 10;
    this.rows = Number(rows) || 10;
};

RecursiveBacktrackerGenerator.prototype.mazeInit = function(rows, cols){
    var a = [];
    var line;
    for (var i = 0; i < 2 * rows + 1; i++) {
        line = [];
        for (j = 0; j < 2 * cols + 1; j++) {
            line[j] = 0;
        }
        a.push(line);
    }
    return a;
};

RecursiveBacktrackerGenerator.prototype.mazeStep = function(a,r,c) {
    var i, vector = [
        [0, 0],
        [0, 0],
        [0, 0]
    ]; /* 3 possible directions */
    function R(val) {
        if (typeof val == "undefined") return vector[i][0];
        vector[i][0] = val;
    }

    function C(val) {
        if (typeof val == "undefined") return vector[i][1];
        vector[i][1] = val;
    }
    while (1) {
        i = 0; /* create a list of possible options */
        if (r > 1 && a[r - 2][c] !== 1) {
            R(r - 2);
            C(c);
            i++;
        }
        if (r < this.rows * 2 - 1 && a[r + 2][c] !== 1) {
            R(r + 2);
            C(c);
            i++;
        }
        if (c > 1 && a[r][c - 2] !== 1) {
            R(r);
            C(c - 2);
            i++;
        }
        if (c < this.cols * 2 - 1 && a[r][c + 2] !== 1) {
            R(r);
            C(c + 2);
            i++;
        }
        /* i is never > 3 because path behind is cleared */
        if (i === 0) break; /* check for dead end */
        i = Math.floor((Math.random() * i)) | 0; /* random direction */
        a[R()][C()] = 1; /* knock out block */
        a[(R() + r) / 2 | 0][(C() + c) / 2 | 0] = 1; /* clear to it */
        this.mazeStep(a,R(), C());
    }
}

RecursiveBacktrackerGenerator.prototype.generate = function() {
    var a = this.mazeInit(this.rows, this.cols);
    var i, r, c;

    c = this.cols | 1;
    a[0][c] = 1;
    a[2 * this.rows | 0][c] = 1;
    i = Math.floor((Math.random() * 2));
    c = (i) ? 1 | 0 : (2 * this.cols - 1);
    r = this.rows | 1;
    a[r][c] = 1;
    this.mazeStep(a, r, c);
    return a;
}
