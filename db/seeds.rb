# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

WechatUser.find_or_create_by!(open_id: '1').update!(nickname: '郭达峰', picture: 'http://101.226.90.164/mmhead/PiajxSqBRaEKztiaKUyDIXyibIPfyBuibmquCtzWjX2qSuH4oHvtdcN0nw/0', max_score: 10)
WechatUser.find_or_create_by!(open_id: '2').update!(nickname: 'Jack Xiong', picture: 'http://101.226.233.167/mmhead/ver_1/t9qr7WG2OicX7ib803FGOTCUZSdpDqibZQqMC5JTTfKNneicJlvTR5XategGZicN2iaWKWdBfqansWicgEEz1j7a8fZ9w/0', max_score: 20)
WechatUser.find_or_create_by!(open_id: '3').update!(nickname: 'Daniel', picture: 'http://180.163.26.112/mmhead/ver_1/NQqXHDrlkia0ichZmKwEvbsHPOeiaCibib6MickHJJQU6CQeriaFYHpv3snCdx4z957x18lmkHRLBWiaVHChgHkkQhdsfMcZvZXRpPx63F4kic85GS18/0', max_score: 30)
