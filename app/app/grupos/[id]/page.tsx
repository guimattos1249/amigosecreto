import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TextRevealCard, TextRevealCardTitle } from "@/components/ui/text-reveal-card"
import { createClient } from "@/utils/supabase/server"
import { Separator } from "@radix-ui/react-separator"

export default async function GroupIdPage({ params }: { params: {id: string } }) {
  const { id: groupId } = await params
  
  const supabase = await createClient()

  const { data: authUser } = await supabase.auth.getUser()

  const { data, error } = await (await supabase)
    .from("groups")
    .select(`
      name,
      participants (*)
    `)
    .eq("id", groupId)
    .single()

  if (error) {
    return <p>Erro ao carregar Grupo</p>
  }

  const assignedParticipantId = data.participants.find(
    (p) => authUser?.user?.email === p.email
  )?.assigned_to

  const assignedParticipant = data.participants.find(
    p => p.id === assignedParticipantId
  )

  
  return (
    <div className="container mx-auto py-6">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">
              Grupo{" "} 
              <span className="font-light underline decoration-red-400">{data.name}</span>
            </CardTitle>
          </div>
          <CardDescription>
            Informações do grupo e participants
          </CardDescription>
        </CardHeader>

        <CardContent>
          <h2 className="text-xl font-semibold mb-4">Participantes</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.participants.map((participant) => (
                <TableRow key={participant.id}>
                  <TableCell>{participant.name}</TableCell>
                  <TableCell>{participant.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Separator className="my-6" />

          <TextRevealCard
            text="Passe o mouse para revelar"
            revealText={assignedParticipant.name}
            className="w-full"
          >
            <TextRevealCardTitle>
              Seu Amigo Secreto é
            </TextRevealCardTitle>
          </TextRevealCard>
        </CardContent>
      </Card>
    </div>
  )
}