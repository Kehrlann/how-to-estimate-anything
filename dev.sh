#!/usr/bin/env bash

SESSION="estimates"

tmux new-session -d -s "$SESSION"
tmux split-window -h
tmux select-pane -t 0
tmux send-keys "cd backend" C-m
tmux send-keys "yarn start:dev" C-m

tmux select-pane -t 1
tmux send-keys "cd frontend" C-m
tmux send-keys "yarn start" C-m
