# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 0) do

  create_table "companies", force: :cascade do |t|
    t.string "name", limit: 45
  end

  create_table "houses", force: :cascade do |t|
    t.string  "house_number", limit: 45
    t.string  "extension",    limit: 45
    t.integer "company_id",   limit: 4
  end

  add_index "houses", ["company_id"], name: "me_company_idx", using: :btree

  create_table "residents", force: :cascade do |t|
    t.string   "name",                  limit: 45
    t.string   "first_name",            limit: 45
    t.string   "last_name",             limit: 45
    t.string   "phone_number",          limit: 45
    t.datetime "birthday"
    t.string   "picture",               limit: 45
    t.integer  "house_id",              limit: 4
    t.integer  "company_id",            limit: 4
    t.integer  "identification_number", limit: 4
  end

  add_index "residents", ["company_id"], name: "me_company_idx", using: :btree
  add_index "residents", ["house_id"], name: "me_company_idx1", using: :btree

  create_table "vehicules", force: :cascade do |t|
    t.string  "license_plate", limit: 45
    t.string  "brand",         limit: 45
    t.string  "color",         limit: 45
    t.integer "house_id",      limit: 4
    t.integer "company_id",    limit: 4
  end

  add_index "vehicules", ["house_id"], name: "me_house_idx", using: :btree

  add_foreign_key "houses", "companies", name: "me_company"
  add_foreign_key "residents", "houses", name: "me_houses"
  add_foreign_key "vehicules", "houses", name: "me_house"
end
